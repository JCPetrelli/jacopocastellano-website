# Jacopo Castellano Website 2026

# Default: list available commands
default:
    @just --list

# Start development server
dev:
    npm run dev

# Build for production
build:
    npm run build

# Preview production build
preview:
    npm run preview

# Build and preview
serve: build preview

# Install dependencies
install:
    npm install

# Clean build artifacts
clean:
    rm -rf dist .astro node_modules/.vite

# Full clean (including node_modules)
clean-all:
    rm -rf dist .astro node_modules

# Reinstall everything
reinstall: clean-all install

# Create new portfolio item (usage: just new-project my-project-name)
new-project name:
    @echo '---' > src/content/portfolio/{{name}}.md
    @echo 'title: "{{name}}"' >> src/content/portfolio/{{name}}.md
    @echo 'description: ""' >> src/content/portfolio/{{name}}.md
    @echo 'date: '$(date +%Y-%m-%d) >> src/content/portfolio/{{name}}.md
    @echo 'category: video' >> src/content/portfolio/{{name}}.md
    @echo 'featured: false' >> src/content/portfolio/{{name}}.md
    @echo 'thumbnail: "/images/portfolio/{{name}}.jpg"' >> src/content/portfolio/{{name}}.md
    @echo 'tags: []' >> src/content/portfolio/{{name}}.md
    @echo '---' >> src/content/portfolio/{{name}}.md
    @echo '' >> src/content/portfolio/{{name}}.md
    @echo 'Write your content here...' >> src/content/portfolio/{{name}}.md
    @echo "Created src/content/portfolio/{{name}}.md"

# Create new blog post (usage: just new-post my-post-title)
new-post name:
    @echo '---' > src/content/blog/{{name}}.md
    @echo 'title: "{{name}}"' >> src/content/blog/{{name}}.md
    @echo 'description: ""' >> src/content/blog/{{name}}.md
    @echo 'date: '$(date +%Y-%m-%d) >> src/content/blog/{{name}}.md
    @echo 'tags: []' >> src/content/blog/{{name}}.md
    @echo '---' >> src/content/blog/{{name}}.md
    @echo '' >> src/content/blog/{{name}}.md
    @echo 'Write your content here...' >> src/content/blog/{{name}}.md
    @echo "Created src/content/blog/{{name}}.md"

# List all portfolio items
list-projects:
    @ls -1 src/content/portfolio/*.md 2>/dev/null | xargs -I {} basename {} .md || echo "No projects yet"

# List all blog posts
list-posts:
    @ls -1 src/content/blog/*.md 2>/dev/null | xargs -I {} basename {} .md || echo "No posts yet"

# Check TypeScript types
check:
    npx astro check

# Optimize images (resize to max 1200px width, 570px for thumbnails)
optimize-images:
    @echo "Optimizing portfolio images..."
    @find public/images/portfolio -name "*.jpg" -size +200k -exec sh -c 'echo "Optimizing {}"; sips -Z 1200 "{}" --out "{}" 2>/dev/null' \;
    @echo "Done. Run 'just image-stats' to see results."

# Show image statistics
image-stats:
    @echo "Portfolio images:"
    @du -sh public/images/portfolio/
    @echo ""
    @echo "Images over 150KB:"
    @find public/images/portfolio -name "*.jpg" -size +150k -exec ls -lh {} \; | awk '{print $5 " " $9}' | sort -hr

# Deploy: push to main triggers GitHub Actions
deploy:
    git push origin main
