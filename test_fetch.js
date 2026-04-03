
async function testFetch() {
    const paths = [
        'src/templates/dashboard.html',
        '/src/templates/dashboard.html',
        './src/templates/dashboard.html'
    ];
    
    for (const p of paths) {
        try {
            console.log(`Testing ${p}...`);
            const res = await fetch(p);
            console.log(`Status: ${res.status}`);
            const text = await res.text();
            console.log(`Length: ${text.length}`);
            console.log(`First 100 chars: ${text.substring(0, 100)}`);
            if (text.includes('id="app"')) console.log('CONTAINED id="app"');
        } catch (e) {
            console.log(`Error testing ${p}: ${e.message}`);
        }
    }
}
testFetch();
