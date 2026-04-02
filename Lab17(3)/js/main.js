const meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
document.head.appendChild(meta); 

const calcState = {
    view: '0',
    buffer: '',
    action: null,
    waitingNext: false
};

function setStyle(el, styles) {
    Object.assign(el.style, styles); 
}

function getCfg() {
    const w = window.innerWidth;
    let cfg = {};

    // ТЕЛЕФОНИ (до 480px)
    if (w <= 480) {
        const gap = 12;
        const bSize = Math.floor((w - (gap * 5)) / 4);
        cfg = { calcW: w, bSize: bSize, gap: gap, fontSize: bSize * 0.8, radius: '0px', isFull: true };
    } 
    // ПЛАНШЕТИ (від 481px до 1024px)
    else if (w <= 1024) {
        const calcW = 500; 
        const gap = 16;
        const bSize = Math.floor((calcW - (gap * 5)) / 4);
        cfg = { calcW: calcW, bSize: bSize, gap: gap, fontSize: 100, radius: '40px', isFull: false };
    } 
    // ПК (більше 1024px)
    else {
        cfg = { calcW: 400, bSize: 85, gap: 15, fontSize: 80, radius: '30px', isFull: false };
    } 

    return cfg;
}

let screenDisplay;

function buildCalculator() {
    const cfg = getCfg();

    // Стиль сторінки
    setStyle(document.body, {
        margin: '0',
        padding: '0',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: cfg.isFull ? 'flex-start' : 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
        overflow: cfg.isFull ? 'hidden' : 'auto'
    });

    const container = document.createElement('div');
    setStyle(container, {
        width: cfg.calcW + 'px',
        backgroundColor: '#000',
        borderRadius: cfg.radius,
        padding: cfg.gap + 'px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    }); 
    document.body.appendChild(container);

    // ДИСПЛЕЙ
    screenDisplay = document.createElement('div');
    setStyle(screenDisplay, {
        color: '#fff',
        fontSize: cfg.fontSize + 'px',
        textAlign: 'right',
        padding: cfg.isFull ? '60px 15px 20px' : '40px 15px 20px',
        minHeight: '1.2em',
        fontWeight: '300',
        wordBreak: 'break-all'
    });
    screenDisplay.textContent = '0';
    container.appendChild(screenDisplay);

    const layout = [
        [['AC', 'fn', 'reset'], ['±', 'fn', 'neg'], ['%', 'fn', 'perc'], ['÷', 'op', '/']],
        [['7', 'num', '7'], ['8', 'num', '8'], ['9', 'num', '9'], ['×', 'op', '*']],
        [['4', 'num', '4'], ['5', 'num', '5'], ['6', 'num', '6'], ['−', 'op', '-']],
        [['1', 'num', '1'], ['2', 'num', '2'], ['3', 'num', '3'], ['+', 'op', '+']],
        [['0', 'num', '0', true], ['.', 'num', 'dot'], ['=', 'op', 'eval']]
    ];

    const colors = {
        fn:  { bg: '#a5a5a5', text: '#000' },
        op:  { bg: '#ff9f0a', text: '#fff' },
        num: { bg: '#333', text: '#fff' }
    };

    layout.forEach(row => {
        const rowDiv = document.createElement('div');
        setStyle(rowDiv, { 
            display: 'flex', 
            gap: cfg.gap + 'px', 
            marginBottom: cfg.gap + 'px',
            width: '100%'
        });
        
        row.forEach(([label, type, id, wide]) => {
            const el = document.createElement('button');
            el.textContent = label;
            
            const c = colors[type];
            const w = wide ? (cfg.bSize * 2 + cfg.gap) : cfg.bSize;

            setStyle(el, {
                width: w + 'px',
                height: cfg.bSize + 'px',
                borderRadius: (cfg.bSize / 2) + 'px',
                border: 'none',
                backgroundColor: c.bg,
                color: c.text,
                fontSize: (cfg.bSize * 0.4) + 'px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: wide ? 'flex-start' : 'center',
                paddingLeft: wide ? (cfg.bSize * 0.35) + 'px' : '0',
                outline: 'none',
                transition: 'filter 0.1s'
            }); 

            el.onclick = () => {
                handleInput(id, type);
                render();
            };
            rowDiv.appendChild(el);
        });
        container.appendChild(rowDiv);
    });
}

function handleInput(id, type) {
    if (type === 'num') {
        const val = id === 'dot' ? '.' : id;
        if (calcState.waitingNext) {
            calcState.view = val === '.' ? '0.' : val;
            calcState.waitingNext = false;
        } else {
            if (val === '.' && calcState.view.includes('.')) return;
            if (calcState.view === '0' && val !== '.') calcState.view = val;
            else if (calcState.view.length < 9) calcState.view += val;
        }
    } else if (type === 'op') {
        if (id === 'eval') {
            calculate();
            calcState.action = null;
            calcState.buffer = '';
        } else {
            if (calcState.action && !calcState.waitingNext) calculate();
            calcState.buffer = calcState.view;
            calcState.action = id;
            calcState.waitingNext = true;
        }
    } else {
        if (id === 'reset') {
            calcState.view = '0'; calcState.buffer = ''; calcState.action = null; calcState.waitingNext = false;
        } else if (id === 'neg') {
            calcState.view = String(parseFloat(calcState.view) * -1);
        } else if (id === 'perc') {
            calcState.view = String(parseFloat(calcState.view) / 100);
        }
    }
}

function calculate() {
    if (!calcState.action || calcState.buffer === '') return;
    const n1 = parseFloat(calcState.buffer);
    const n2 = parseFloat(calcState.view);
    let res = 0;
    switch (calcState.action) {
        case '+': res = n1 + n2; break;
        case '-': res = n1 - n2; break;
        case '*': res = n1 * n2; break;
        case '/': res = n2 === 0 ? 'Error' : n1 / n2; break;
    }
    calcState.view = String(Number(res.toFixed(8)));
    calcState.waitingNext = true;
}

function render() {
    screenDisplay.textContent = calcState.view.replace('.', ',');
    const cfg = getCfg();
    if (calcState.view.length > 7) {
        screenDisplay.style.fontSize = (cfg.fontSize * 0.7) + 'px';
    } else {
        screenDisplay.style.fontSize = cfg.fontSize + 'px';
    }
}

// Побудова та реагування на зміну розміру
window.onresize = () => {
    document.body.innerHTML = '';
    buildCalculator();
    render();
};

buildCalculator();