#!/bin/sh

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_API_URL#$NEXT_PUBLIC_API_URL#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_PUBLIC_DATA_WATCH_API_URL#$NEXT_PUBLIC_DATA_WATCH_API_URL#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_PUBLIC_ALLOWED_EXTENTION#$NEXT_PUBLIC_ALLOWED_EXTENTION#g"

echo "Starting Nextjs"
exec "$@"
