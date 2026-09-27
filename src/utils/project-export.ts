import JSZip from 'jszip';
import { StudioProject } from '@/types/css-studio';
import { generateFullProjectCss, generateElementHtml } from '@/utils/css-generator';

export async function exportProjectZip(project: StudioProject): Promise<Blob> {
  const zip = new JSZip();

  const rootEl = project.elements.find((el) => el.id === project.rootElementId);
  const elementsHtml = project.elements
    .filter((el) => el.parentId === project.rootElementId)
    .map((el) => generateElementHtml(el, project.elements, 1))
    .join('');

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.name} - CSS Studio Export</title>
  <link rel="stylesheet" href="style.css">
  ${project.useVariables ? '<link rel="stylesheet" href="variables.css">' : ''}
</head>
<body>
  <div class="canvas-container">
${elementsHtml}  </div>
</body>
</html>`;

  const fullCss = generateFullProjectCss(project.elements, project.cssVariables, false);

  zip.file('index.html', fullHtml);
  zip.file('style.css', fullCss);

  if (project.cssVariables.length > 0) {
    let varsCss = ':root {\n';
    project.cssVariables.forEach((v) => {
      varsCss += `  ${v.name}: ${v.value};\n`;
    });
    varsCss += '}\n';
    zip.file('variables.css', varsCss);
  }

  zip.file(
    'README.md',
    `# ${project.name}

Created with **CSS Studio** - Visual CSS Playground & Generator.

## Files:
- \`index.html\`: Project HTML structure
- \`style.css\`: Production ready generated CSS
- \`variables.css\`: CSS Variables definitions

Enjoy your clean CSS code!
`
  );

  return await zip.generateAsync({ type: 'blob' });
}
