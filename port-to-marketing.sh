#!/usr/bin/env bash

# port-to-marketing.sh
# Usage: ./port-to-marketing.sh /path/to/saas/repo /path/to/marketing/repo

SRC_DIR=$1
DEST_DIR=$2

if [ -z "$SRC_DIR" ] || [ -z "$DEST_DIR" ]; then
    echo "❌ Error: Missing arguments."
    echo "Usage: ./port-to-marketing.sh /path/to/saas/repo /path/to/marketing/repo"
    exit 1
fi

if [ ! -d "$SRC_DIR" ]; then
    echo "❌ Error: Source directory $SRC_DIR does not exist."
    exit 1
fi

if [ ! -d "$DEST_DIR" ]; then
    echo "❌ Error: Destination directory $DEST_DIR does not exist."
    exit 1
fi

echo "🚀 Starting port from $SRC_DIR to $DEST_DIR..."

# 1. Create necessary directory structures
mkdir -p "$DEST_DIR/components/ui"
mkdir -p "$DEST_DIR/components/custom-ui"
mkdir -p "$DEST_DIR/lib/server"
mkdir -p "$DEST_DIR/lib/client"
mkdir -p "$DEST_DIR/lib/shared"
mkdir -p "$DEST_DIR/types"

# 2. Copy Base UI Components (Shadcn/Radix)
echo "📦 Copying Base UI Components..."
cp "$SRC_DIR/components/ui/button.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/buttonVariants.ts" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/input.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/label.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/separator.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/skeleton.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/scroll-area.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/tabs.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/textarea.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/dialog.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/popover.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/tooltip.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/sonner.tsx" "$DEST_DIR/components/ui/"
cp "$SRC_DIR/components/ui/spinner.tsx" "$DEST_DIR/components/ui/"

# 3. Copy Custom UI Components
echo "🎨 Copying Custom UI Components..."
cp "$SRC_DIR/components/custom-ui/custom-button.tsx" "$DEST_DIR/components/custom-ui/"
cp "$SRC_DIR/components/custom-ui/custom-input.tsx" "$DEST_DIR/components/custom-ui/"
cp "$SRC_DIR/components/custom-ui/custom-error-message.tsx" "$DEST_DIR/components/custom-ui/"
cp "$SRC_DIR/components/custom-ui/custom-accordion.tsx" "$DEST_DIR/components/custom-ui/"

# 4. Copy Lib / Utils
echo "⚙️ Copying Utilities & Server Logic..."
cp "$SRC_DIR/lib/utils.ts" "$DEST_DIR/lib/"
cp "$SRC_DIR/lib/server/safe-action.ts" "$DEST_DIR/lib/server/"
cp "$SRC_DIR/lib/server/rate-limit.ts" "$DEST_DIR/lib/server/"
cp "$SRC_DIR/lib/server/request.ts" "$DEST_DIR/lib/server/"
cp "$SRC_DIR/lib/server/logger.server.ts" "$DEST_DIR/lib/server/"

# Copy client logger if it exists (assuming it does based on your instructions)
if [ -f "$SRC_DIR/lib/client/logger.client.ts" ]; then
    cp "$SRC_DIR/lib/client/logger.client.ts" "$DEST_DIR/lib/client/"
fi

# Copy shared log config if it exists
if [ -f "$SRC_DIR/lib/shared/logConfig.ts" ]; then
    cp "$SRC_DIR/lib/shared/logConfig.ts" "$DEST_DIR/lib/shared/"
fi

# 5. Copy Types
echo "🏷️ Copying Types..."
cp "$SRC_DIR/types/types-for-hooks.ts" "$DEST_DIR/types/" 2>/dev/null || true
cp "$SRC_DIR/types/ENUMS.ts" "$DEST_DIR/types/" 2>/dev/null || true
cp "$SRC_DIR/types/types.ts" "$DEST_DIR/types/" 2>/dev/null || true

# 6. Copy Configs
echo "📝 Copying Configurations..."
cp "$SRC_DIR/components.json" "$DEST_DIR/"
cp "$SRC_DIR/prettier.config.js" "$DEST_DIR/" 2>/dev/null || true
cp "$SRC_DIR/commitlint.config.ts" "$DEST_DIR/" 2>/dev/null || true

echo "✅ Porting complete! Please review the files in $DEST_DIR."
