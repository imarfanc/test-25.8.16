#!/bin/bash

# Simple build script to convert TypeScript to JavaScript for GitHub Pages
# This script can be run manually when you make changes to the TypeScript file

echo "Building frontend assets..."

# Check if TypeScript compiler is available
if ! command -v tsc &> /dev/null; then
    echo "TypeScript compiler not found. You can install it with: npm install -g typescript"
    echo "For now, manually converting TypeScript to JavaScript..."
    
    # Manual conversion: Remove TypeScript type annotations
    # This is a simplified conversion - for complex TypeScript features, use the actual TypeScript compiler
    sed -E '
        # Remove type annotations from function parameters and return types
        s/: [A-Za-z\[\]<>|&{}]+(\?)?//g
        # Remove type keyword
        s/^type .+ = \{[^}]*\};//g
        # Remove as type assertions
        s/ as [A-Za-z\[\]<>|&{}]+//g
        # Remove interface declarations
        s/^interface .+ \{[^}]*\}//g
        # Remove ! non-null assertions
        s/!\.([a-zA-Z])/.\1/g
        s/!;//g
    ' frontend/index.ts > frontend/index.js.tmp
    
    # Clean up empty lines from removed type definitions
    awk 'NF || !p; {p=NF}' frontend/index.js.tmp > frontend/index.js
    rm frontend/index.js.tmp
    
    echo "Manual conversion complete. Note: This is a basic conversion."
    echo "For production use, install TypeScript: npm install -g typescript"
else
    # Use TypeScript compiler if available
    tsc frontend/index.ts --outDir frontend --target ES2020 --module ES2020 --removeComments
    echo "TypeScript compilation complete."
fi

echo "Build complete! The JavaScript file is at frontend/index.js"