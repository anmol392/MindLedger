// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title MindLedger $POI Token (Proof-of-Intellect)
 * @author Senior Blockchain Architect
 * @notice Implements scarcity (21M cap), halving schedules, and PoI mining rewards.
 */
contract POIToken is ERC20, Ownable, Pausable {
    uint256 public constant MAX_SUPPLY = 21_000_000 * 10**18;
    uint256 public constant HALVING_INTERVAL = 2 * 365 days;
    
    uint256 public lastHalvingTime;
    uint256 public currentRewardRateTier1 = 0.5 * 10**18;
    uint256 public currentRewardRateTier2 = 1 * 10**18;
    uint256 public currentRewardRateTier3 = 3 * 10**18;
    uint256 public currentRewardRateTier4 = 8 * 10**18;
    uint256 public currentRewardRateTier5 = 20 * 10**18;

    mapping(address => bool) public isKycVerified;
    mapping(address => uint256) public stakedBalance;

    event MinerRewarded(address indexed miner, uint256 amount, uint256 tier, bytes32 solutionHash);
    event HalvingTriggered(uint256 newTier1Rate);
    event KycUpdated(address indexed user, bool status);

    constructor() ERC20("MindLedger", "POI") Ownable(msg.sender) {
        lastHalvingTime = block.timestamp;
    }

    /**
     * @notice Oracle-driven minting after peer verification passed.
     * @param _to Miner's address
     * @param _tier Problem difficulty tier (1-5)
     * @param _solutionHash Immutable reference to the solve
     */
    function mintReward(address _to, uint256 _tier, bytes32 _solutionHash) external onlyOwner {
        checkHalving();
        uint256 amount = getReward(_tier);
        require(totalSupply() + amount <= MAX_SUPPLY, "MindLedger: CAP REACHED");
        _mint(_to, amount);
        emit MinerRewarded(_to, amount, _tier, _solutionHash);
    }

    /**
     * @notice Reward co-authors based on contribution weights.
     */
    function mintPaperReward(
        address[] calldata contributors,
        uint256[] calldata weights, // must sum to 100
        uint256 totalReward
    ) external onlyOwner {
        checkHalving();
        require(contributors.length == weights.length, "MindLedger: MISMATCH");
        for (uint i = 0; i < contributors.length; i++) {
            uint256 share = (totalReward * weights[i]) / 100;
            require(totalSupply() + share <= MAX_SUPPLY, "CAP REACHED");
            _mint(contributors[i], share);
        }
    }

    /**
     * @notice Reward contest winners.
     */
    function mintContestReward(
        address[] calldata winners,
        uint256[] calldata amounts
    ) external onlyOwner {
        checkHalving();
        require(winners.length == amounts.length, "MindLedger: MISMATCH");
        for (uint i = 0; i < winners.length; i++) {
            require(totalSupply() + amounts[i] <= MAX_SUPPLY, "CAP REACHED");
            _mint(winners[i], amounts[i]);
        }
    }

    function checkHalving() internal {
        if (block.timestamp >= lastHalvingTime + HALVING_INTERVAL) {
            currentRewardRateTier1 /= 2;
            currentRewardRateTier2 /= 2;
            currentRewardRateTier3 /= 2;
            currentRewardRateTier4 /= 2;
            currentRewardRateTier5 /= 2;
            lastHalvingTime = block.timestamp;
            emit HalvingTriggered(currentRewardRateTier1);
        }
    }

    function getReward(uint256 _tier) public view returns (uint256) {
        if (_tier == 1) return currentRewardRateTier1;
        if (_tier == 2) return currentRewardRateTier2;
        if (_tier == 3) return currentRewardRateTier3;
        if (_tier == 4) return currentRewardRateTier4;
        if (_tier == 5) return currentRewardRateTier5;
        return 0;
    }

    function updateKyc(address _user, bool _status) external onlyOwner {
        isKycVerified[_user] = _status;
        emit KycUpdated(_user, _status);
    }

    /**
     * @notice CBDC Withdrawal Restriction (Layer 5 Compliance)
     */
    function withdrawToFiat(uint256 _amount) external {
        require(isKycVerified[msg.sender], "MindLedger: KYC REQUIRED FOR FIAT");
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        _burn(msg.sender, _amount);
        // Backend webhook will catch this event to trigger INR/e-Rupee transfer
    }

    function stake(uint256 _amount) external {
        _transfer(msg.sender, address(this), _amount);
        stakedBalance[msg.sender] += _amount;
    }
}
