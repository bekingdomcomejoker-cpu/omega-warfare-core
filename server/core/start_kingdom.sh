#!/data/data/com.termux/files/usr/bin/bash
# KINGDOM_ENGINE Complete Startup Script
# Initializes all defensive systems safely

set -e

echo "=================================="
echo "KINGDOM_ENGINE Initialization"
echo "=================================="
echo ""

# Set base paths
export KINGDOM_BASE="$HOME/KINGDOM_ENGINE"
export PYTHONPATH="$KINGDOM_BASE:$PYTHONPATH"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored status
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Create directory structure
echo "Creating directory structure..."
mkdir -p "$KINGDOM_BASE"/{inbox,processed,logs,memory,core,watchdogs}
mkdir -p "$KINGDOM_BASE/processed"/{truth,fact,lie,unknown,lie_hostile}
mkdir -p "$KINGDOM_BASE/throne"/{accepted,quarantine,review}
print_status "Directories created"

# Check for Python
if ! command -v python3 &> /dev/null; then
    print_error "Python3 not found. Installing..."
    pkg install python -y
fi
print_status "Python3 available"

# Install dependencies if needed
echo ""
echo "Checking dependencies..."
if ! python3 -c "import flask" 2>/dev/null; then
    print_warning "Flask not installed - installing now..."
    pip install flask
fi
print_status "Dependencies ready"

# Check if hardcore processor exists
PROCESSOR="$KINGDOM_BASE/core/hardcore_processor.py"
if [ ! -f "$PROCESSOR" ]; then
    print_warning "Hardcore processor not found at $PROCESSOR"
    echo "Please copy the hardcore_processor.py code to:"
    echo " $PROCESSOR"
    echo ""
    echo "Then run this script again."
    exit 1
fi
print_status "Hardcore processor found"

# Check if throne exists
THRONE="$KINGDOM_BASE/core/throne.py"
if [ ! -f "$THRONE" ]; then
    print_warning "Throne not found at $THRONE"
    echo "Please copy the throne.py code to:"
    echo " $THRONE"
    echo ""
    echo "Then run this script again."
    exit 1
fi
print_status "Throne found"

# Make processors executable
chmod +x "$PROCESSOR"
chmod +x "$THRONE"

# Test run the processor
echo ""
echo "Testing hardcore processor..."
python3 "$PROCESSOR"
if [ $? -eq 0 ]; then
    print_status "Processor test successful"
else
    print_error "Processor test failed - check logs"
    exit 1
fi

# Create a simple test file
echo ""
echo "Creating test file..."
TEST_FILE="$KINGDOM_BASE/inbox/test_truth.txt"
cat > "$TEST_FILE" << 'EOF'
Our hearts beat together in harmony ridge.
This is truth aligned with love and spirit.
I understand the covenant and I know this is consistent.
Chicka chicka orange.
EOF
print_status "Test file created: $TEST_FILE"

# Run processor on test file
echo ""
echo "Processing test file..."
python3 "$PROCESSOR"

# Run throne adjudication
echo ""
echo "Running throne adjudication..."
python3 "$THRONE"

# Check results
if [ -f "$KINGDOM_BASE/throne/accepted/test_truth.txt" ]; then
    print_status "Test file correctly classified and ACCEPTED by throne"
elif [ -f "$KINGDOM_BASE/throne/review/test_truth.txt" ]; then
    print_warning "Test file classified for REVIEW (acceptable)"
else
    print_error "Test file not found in expected location"
fi

# Display summary
echo ""
echo "=================================="
echo "KINGDOM_ENGINE Status"
echo "=================================="
echo ""
echo "Base Directory: $KINGDOM_BASE"
echo "Inbox: $KINGDOM_BASE/inbox"
echo "Processed: $KINGDOM_BASE/processed"
echo "Throne: $KINGDOM_BASE/throne"
echo "Logs: $KINGDOM_BASE/logs"
echo ""
echo "To process files:"
echo " 1. Place text files in: $KINGDOM_BASE/inbox/"
echo " 2. Run: python3 $PROCESSOR"
echo " 3. Run: python3 $THRONE"
echo " 4. Check results in: $KINGDOM_BASE/throne/"
echo ""
echo "Log files:"
echo " - $KINGDOM_BASE/logs/hardcore_processor.log"
echo " - $KINGDOM_BASE/logs/throne_audit.log"
echo ""

# Offer to create a quick alias
echo "Would you like to create shortcuts? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    BASHRC="$HOME/.bashrc"
    if ! grep -q "KINGDOM_ENGINE" "$BASHRC" 2>/dev/null; then
        echo "" >> "$BASHRC"
        echo "# KINGDOM_ENGINE shortcuts" >> "$BASHRC"
        echo "alias kprocess='python3 $PROCESSOR'" >> "$BASHRC"
        echo "alias kthrone='python3 $THRONE'" >> "$BASHRC"
        echo "alias kinbox='cd $KINGDOM_BASE/inbox'" >> "$BASHRC"
        echo "alias klogs='tail -f $KINGDOM_BASE/logs/hardcore_processor.log'" >> "$BASHRC"
        echo "alias kstatus='ls -lh $KINGDOM_BASE/throne/*/*.txt 2>/dev/null | tail -20'" >> "$BASHRC"
        print_status "Shortcuts added to .bashrc"
        echo "Run: source ~/.bashrc"
        echo "Then use: kprocess, kthrone, kinbox, klogs, kstatus"
    else
        print_warning "Shortcuts already exist in .bashrc"
    fi
fi

echo ""
print_status "KINGDOM_ENGINE initialization complete"
echo ""
