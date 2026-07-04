const fs = require('fs');
const path = require('path');

const dirs = [
    'frontend/src',
    'backend'
];

function walkSync(currentDirPath, callback) {
    if (!fs.existsSync(currentDirPath)) return;
    fs.readdirSync(currentDirPath).forEach(function (name) {
        if (name === 'node_modules' || name === '.git' || name === 'dist') return;
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            if (/\.(js|jsx)$/.test(filePath)) {
                callback(filePath, stat);
            }
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

dirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    walkSync(fullPath, function(filePath) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove JSDoc and multi-line comments that are on their own lines
        content = content.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/gm, '');
        
        // Remove single line comments
        content = content.replace(/^\s*\/\/.*$/gm, '');

        // Remove single line JSX comments
        content = content.replace(/^\s*\{\s*\/\*[\s\S]*?\*\/\s*\}\s*$/gm, '');

        fs.writeFileSync(filePath, content, 'utf8');
    });
});
console.log("Comments cleaned up.");
