# Workspace Instructions Help

This guide explains how to create and use instruction files in VS Code workspaces to enhance AI agent capabilities.

## What are Workspace Instructions?

Workspace instructions are `.instructions.md` files placed in `.github/instructions/` that provide context, conventions, and guidance for AI agents working in your codebase.

## File Structure

```
.github/
  instructions/
    frontend-design.instructions.md
    tailwind-4.instructions.md
    workspace-context.instructions.md
  agents/
    custom-agent.agent.md
  prompts/
    setup.prompt.md
```

## Creating Instruction Files

### Basic Format

```markdown
---
name: instruction-name
description: Brief description of what this instruction covers
---

# Title

Detailed instructions and guidelines...
```

### Frontmatter Fields

- `name`: Unique identifier for the instruction
- `description`: Short description shown in agent selection

## Types of Instructions

### 1. Skill Instructions
Provide domain-specific knowledge and best practices.

**Example**: `frontend-design.instructions.md`
- Guides creative frontend development
- Avoids generic AI aesthetics
- Provides typography, color, and animation guidelines

### 2. Technology Instructions
Document framework-specific features and conventions.

**Example**: `tailwind-4.instructions.md`
- Explains Tailwind CSS v4 features
- Setup and configuration patterns
- Best practices for theming

### 3. Workspace Context Instructions
Give agents understanding of your project's structure and conventions.

**Example**: `workspace-context.instructions.md`
- Project overview and purpose
- Technology stack details
- Development conventions
- Key files and their roles

## Agent Files

Agents are defined in `.github/agents/` with `.agent.md` extension.

### Format

```markdown
---
name: Agent Name
description: What the agent does
argument-hint: Expected input format
tools: ['search', 'edit']  # Optional tool restrictions
---

Agent-specific instructions...
```

## Prompt Files

Prompts in `.github/prompts/` provide task-specific guidance.

### Format

```markdown
---
name: prompt-name
description: When to use this prompt
---

# Prompt Title

Detailed task instructions...
```

## Best Practices

### Writing Instructions

1. **Be Specific**: Include concrete examples and code snippets
2. **Use Frontmatter**: Always include name and description
3. **Organize Logically**: Group related concepts together
4. **Keep Updated**: Review and update as project evolves
5. **Test with Agents**: Verify instructions work as expected

### Naming Conventions

- Use kebab-case for file names: `workspace-context.instructions.md`
- Descriptive names: `react-best-practices.instructions.md`
- Avoid generic names: `instructions.md`

### Content Guidelines

- Start with overview/context
- Include code examples where helpful
- Document conventions and patterns
- Explain why certain approaches are preferred
- Link to relevant files or documentation

## Using Instructions

### For Agents

Instructions are automatically loaded when agents work in the workspace. They provide:

- Project context and structure
- Coding conventions and standards
- Technology-specific guidance
- Best practices and patterns

### For Development

- **Onboarding**: Help new team members understand the codebase
- **Consistency**: Ensure uniform code quality and patterns
- **Automation**: Enable agents to make better decisions
- **Documentation**: Living documentation that stays current

## Examples in This Workspace

This Soc Ops workspace includes:

- **frontend-design.instructions.md**: Creative UI development guidelines
- **tailwind-4.instructions.md**: Tailwind CSS v4 best practices
- **workspace-context.instructions.md**: Project overview and conventions
- **quiz-master.agent.md**: Custom agent for generating bingo questions

## Creating Custom Agents

Use the `agent-customization` skill to create specialized agents:

1. Define the agent's purpose and capabilities
2. Specify required tools and restrictions
3. Write clear, actionable instructions
4. Test the agent on sample tasks

## Troubleshooting

### Instructions Not Loading

- Check file placement in `.github/instructions/`
- Verify frontmatter format
- Ensure file has `.instructions.md` extension

### Agent Not Following Instructions

- Review instruction clarity and specificity
- Check for conflicting guidance
- Test with simpler tasks first
- Update instructions based on agent behavior

## Advanced Usage

### Conditional Instructions

Use frontmatter to control when instructions apply:

```markdown
---
name: production-build
description: Special considerations for production builds
applyTo: '**/package.json'
---
```

### Tool-Specific Guidance

Provide tool-specific instructions:

```markdown
---
name: testing-tools
description: How to use testing tools in this workspace
---

# Testing Framework

Use Vitest for unit tests...
```

## Resources

- [VS Code Agent Customization](https://code.visualstudio.com/docs/copilot/customization)
- [Multi-Agent Development Patterns](workshop/GUIDE.md)
- [Claude Skills Documentation](https://docs.anthropic.com/claude/docs/skills)