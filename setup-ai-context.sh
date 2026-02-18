#!/bin/bash
# setup-ai-context.sh
#
# Usage:
#   ./setup-ai-context.sh           — setup all tools
#   ./setup-ai-context.sh claude      — setup Claude Code only
#   ./setup-ai-context.sh cursor      — setup Cursor only
#   ./setup-ai-context.sh copilot     — setup GitHub Copilot only
#   ./setup-ai-context.sh antigravity — setup Antigravity only

set -e  # Stop on error

TOOL="${1:-all}"

echo "🤖 Setting up AI development environment (tool: $TOOL)..."

# Check availability AGENTS.md
if [ ! -f "AGENTS.md" ]; then
    echo "❌ Error: AGENTS.md not found!"
    echo "This file should be in the root of your project."
    exit 1
fi

# Function to create a symlink
create_symlink() {
    local source=$1
    local target=$2

    # Delete old file/symlink if it exists
    if [ -e "$target" ] || [ -L "$target" ]; then
        echo "  Removing existing $target"
        rm "$target"
    fi

    # Create parent directory if needed
    mkdir -p "$(dirname "$target")"

    # Create a new symlink
    ln -sf "$source" "$target"
    echo "  ✓ Created $target → $source"
}

# Function to sync files from a source directory to a destination directory
sync_files() {
    local source_dir=$1
    local dest_dir=$2

    if [ -d "$source_dir" ]; then
        echo "Syncing $source_dir → $dest_dir"
        mkdir -p "$dest_dir"
        find "$source_dir" -name "*.md" | while read -r source; do
            rel="${source#$source_dir/}"
            target="$dest_dir/$rel"
            mkdir -p "$(dirname "$target")"
            depth=$(echo "$target" | tr -cd '/' | wc -c | tr -d ' ')
            prefix=$(printf '../%.0s' $(seq 1 "$depth"))
            create_symlink "${prefix}${source}" "$target"
        done
    else
        echo "  ℹ️  No $source_dir directory found, skipping"
    fi
}

# Setup functions per tool
setup_claude() {
    echo ""
    echo "Setting up Claude Code..."
    create_symlink "AGENTS.md" "CLAUDE.md"
    sync_files ".ai/commands" ".claude/commands"
}

setup_cursor() {
    echo ""
    echo "Setting up Cursor..."
    echo "  ℹ️  Cursor natively reads AGENTS.md — no symlink needed"
}

setup_copilot() {
    echo ""
    echo "Setting up GitHub Copilot..."
    create_symlink "AGENTS.md" ".copilot-instructions.md"
}

setup_antigravity() {
    echo ""
    echo "Setting up Antigravity..."
    echo "  ℹ️  Antigravity natively reads AGENTS.md"
    create_symlink "../AGENTS.md" ".agent/AGENTS.md"
    sync_files ".ai/commands" ".agent/workflows"
    sync_files ".ai/rules" ".agent/rules"
    sync_files ".ai/project" ".agent/project"
}

# Run based on argument
case "$TOOL" in
    claude)      setup_claude ;;
    cursor)      setup_cursor ;;
    copilot)     setup_copilot ;;
    antigravity) setup_antigravity ;;
    all)
        setup_claude
        setup_cursor
        setup_copilot
        setup_antigravity
        ;;
    *)
        echo "❌ Unknown tool: $TOOL"
        echo "Available: claude, cursor, copilot, antigravity, all"
        exit 1
        ;;
esac

# Verify symlinks
echo ""
echo "🔍 Verifying symlinks..."
for file in CLAUDE.md .copilot-instructions.md .agent/AGENTS.md; do
    if [ -L "$file" ]; then
        if [ -e "$file" ]; then
            echo "  ✓ $file is valid"
        fi
    fi
done

echo ""
echo "✅ Setup complete!"
