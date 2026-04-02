# Project Documentation

Welcome to the Pokedex Web Application documentation. This folder contains comprehensive guides for maintaining code quality and consistency.

## 📚 Documentation Files

### [Architecture Audit](./architecture-audit.md)
Comprehensive audit of the application architecture, including:
- Critical structural problems and solutions
- Recommended folder structure
- Performance optimization strategies
- Migration plan

### [Naming Conventions](./naming-conventions.md)
Guidelines for consistent naming across the codebase:
- File naming rules (kebab-case)
- Export naming conventions (PascalCase, camelCase, etc.)
- Import path conventions
- Barrel export guidelines

### [Folder Structure](./folder-structure.md)
Complete overview of the project structure:
- Directory responsibilities
- Feature-based organization
- Adding new features
- Migration notes

### [Type Ownership](./type-ownership.md)
Rules for organizing TypeScript types:
- Type hierarchy and location rules
- Zod schema integration
- Global vs feature types
- Interface vs type usage

## 🚀 Quick Start

1. **New to the project?** Start with [Architecture Audit](./architecture-audit.md)
2. **Adding a feature?** Check [Folder Structure](./folder-structure.md)
3. **Creating files?** Follow [Naming Conventions](./naming-conventions.md)
4. **Defining types?** Read [Type Ownership](./type-ownership.md)

## 🎯 Key Principles

1. **Feature-based organization** - Code is organized by domain (pokemon, i18n, theme)
2. **Zod-first validation** - Define schemas first, infer types second
3. **Server Components by default** - Use RSC for better performance
4. **Type safety everywhere** - Leverage TypeScript and Zod for runtime safety
5. **Consistent naming** - Follow kebab-case for files, PascalCase for exports

## 📝 Contributing

When making changes:
1. Follow the naming conventions
2. Place files in the correct directory
3. Use Zod schemas for validation
4. Keep features self-contained
5. Update documentation if needed

## 🔧 Maintenance

These documents should be updated when:
- Adding new architectural patterns
- Changing folder structure
- Introducing new conventions
- Completing major refactors
