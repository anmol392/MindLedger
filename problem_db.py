# problem_db.py - Fallback Database for Olympiad Intellect Ledger

# Structure: {Topic: {Difficulty_Tier: [Original_Problems]}}
# Difficulty Tier corresponds to int(current_difficulty)

PROBLEM_DATABASE = {
    "MATHEMATICS": {
        1: [
            {"title": "JEE Algebra I", "problem": "Find all real roots of the equation x^4 - 4x^3 + 6x^2 - 4x + 1 = 0.", "constraints": "x in R", "approach": "Note the expansion of (x-1)^4."},
            {"title": "Coordinate Geometry Basics", "problem": "Determine the locus of a point whose distance from (1,0) is twice its distance from the line x=4.", "constraints": "Standard Cartesian plane.", "approach": "Use the definition of an ellipse or directly solve (x-1)^2 + y^2 = 4(x-4)^2."}
        ],
        5: [
            {"title": "INMO Number Theory", "problem": "Find all pairs (p, n) such that p^n + 1 is a perfect square, where p is a prime and n is a positive integer.", "constraints": "p in Prime, n in Z+", "approach": "Consider the parity of n and factorize (k-1)(k+1) = p^n."}
        ],
        9: [
            {"title": "IMO Inequalities", "problem": "Let a, b, c be positive real numbers such that abc = 1. Prove that 1/(a^3(b+c)) + 1/(b^3(a+c)) + 1/(c^3(a+b)) >= 3/2.", "constraints": "a, b, c > 0, abc=1", "approach": "Standard Cauchy-Schwarz in Titu's form or Holder's inequality."}
        ]
    },
    "PHYSICS": {
        1: [
            {"title": "JEE Mechanics", "problem": "A block of mass m is placed on a rough horizontal surface with friction coefficient mu. Find the minimum force required to move the block.", "constraints": "F > 0", "approach": "Consider both horizontal and inclined pull (optimal angle)."}
        ],
        5: [
            {"title": "INPhO Thermal Physics", "problem": "Calculate the efficiency of a cycle consisting of two isothermal and two isobaric processes.", "constraints": "Ideal gas law.", "approach": "Determine Q_in and Q_out for each stage."}
        ],
        9: [
            {"title": "IPhO Relativity", "problem": "A spaceship of length L moves past an observer at velocity v. If a photon is emitted from the rear, how long does it take (observer's frame) to reach the front?", "constraints": "v < c", "approach": "Use Lorentz transformations or relative velocity addition c-v."}
        ]
    },
    "CHEMISTRY": {
        1: [
            {"title": "JEE Physical", "problem": "Calculate the osmotic pressure of a 5% aqueous solution of urea at 273K.", "constraints": "Use R = 0.0821 L atm / K mol.", "approach": "Pi = iCRT."}
        ],
        5: [
            {"title": "IChO Kinetics", "problem": "Determine the half-life of a radioactive isotope if its activity drops to 1/8th in 15 days.", "constraints": "First-order kinetics.", "approach": "ln(A/A0) = -kt or recognize 2^3 halving."}
        ]
    },
    "PROGRAMMING": {
        1: [
            {"title": "Basics", "problem": "Implement an O(N log N) algorithm to find the majority element in an array.", "constraints": "N < 10^6", "approach": "Sorting or divide and conquer (though Boyer-Moore is O(N))."}
        ],
        5: [
            {"title": "IOI Graph Algorithms", "problem": "Given a graph with N nodes and M edges, find the number of strongly connected components.", "constraints": "N, M < 10^5", "approach": "Tarjan's or Kosaraju's algorithm."}
        ],
        9: [
            {"title": "ICPC Geometry", "problem": "Find the area of the intersection of two convex polygons with a total of N vertices.", "constraints": "N < 1000", "approach": "Sutherland-Hodgman or rotating calipers."}
        ]
    }
}
