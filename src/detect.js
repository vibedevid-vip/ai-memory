import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export async function detectFramework(projectPath) {
  const detections = [
    detectNextJS,
    detectReact,
    detectVue,
    detectExpress,
    detectDjango,
    detectFlask,
  ];

  for (const detect of detections) {
    const result = detect(projectPath);
    if (result) return result;
  }

  return { name: 'Generic Project', framework: 'generic' };
}

function detectNextJS(path) {
  const pkgPath = join(path, 'package.json');
  if (!existsSync(pkgPath)) return null;
  
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    if (deps['next']) {
      return {
        name: 'Next.js',
        framework: 'nextjs',
        version: deps['next'],
        hasTypeScript: !!deps['typescript']
      };
    }
  } catch (e) {
    return null;
  }
  return null;
}

function detectReact(path) {
  const pkgPath = join(path, 'package.json');
  if (!existsSync(pkgPath)) return null;
  
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    if (deps['react'] && !deps['next']) {
      return {
        name: 'React',
        framework: 'react',
        version: deps['react'],
        hasTypeScript: !!deps['typescript']
      };
    }
  } catch (e) {
    return null;
  }
  return null;
}

function detectVue(path) {
  const pkgPath = join(path, 'package.json');
  if (!existsSync(pkgPath)) return null;
  
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    if (deps['vue']) {
      return {
        name: 'Vue.js',
        framework: 'vue',
        version: deps['vue'],
        hasTypeScript: !!deps['typescript']
      };
    }
  } catch (e) {
    return null;
  }
  return null;
}

function detectExpress(path) {
  const pkgPath = join(path, 'package.json');
  if (!existsSync(pkgPath)) return null;
  
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    if (deps['express']) {
      return {
        name: 'Express',
        framework: 'express',
        version: deps['express'],
        hasTypeScript: !!deps['typescript']
      };
    }
  } catch (e) {
    return null;
  }
  return null;
}

function detectDjango(path) {
  if (existsSync(join(path, 'manage.py'))) {
    return {
      name: 'Django',
      framework: 'django',
      version: 'Unknown'
    };
  }
  return null;
}

function detectFlask(path) {
  if (existsSync(join(path, 'app.py')) || existsSync(join(path, 'wsgi.py'))) {
    return {
      name: 'Flask',
      framework: 'flask',
      version: 'Unknown'
    };
  }
  return null;
}
