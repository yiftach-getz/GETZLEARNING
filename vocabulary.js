// Vocabulary words (same as in app.js)
const words = [
    { english: 'each', hebrew: 'כל (אחד)', image: 'https://picsum.photos/200/200?random=1' },
    { english: 'everyone', hebrew: 'כולם', image: 'https://picsum.photos/200/200?random=2' },
    { english: 'fall', hebrew: 'ליפול', image: 'https://picsum.photos/200/200?random=3' },
    { english: 'flag', hebrew: 'דגל', image: 'https://picsum.photos/200/200?random=4' },
    { english: 'guess', hebrew: 'לנחש', image: 'https://picsum.photos/200/200?random=5' },
    { english: 'kind of', hebrew: 'סוג של', image: 'https://picsum.photos/200/200?random=6' },
    { english: 'many', hebrew: 'הרבה', image: 'https://picsum.photos/200/200?random=7' },
    { english: 'outside', hebrew: 'בחוץ', image: 'https://picsum.photos/200/200?random=8' },
    { english: 'parents', hebrew: 'הורים', image: 'https://picsum.photos/200/200?random=9' },
    { english: 'pull', hebrew: 'למשוך', image: 'https://picsum.photos/200/200?random=10' },
    { english: 'spook', hebrew: 'כדי להפחיד', image: 'https://picsum.photos/200/200?random=11' },
    { english: 'weekend', hebrew: 'סוף שבוע', image: 'https://picsum.photos/200/200?random=12' }
];

// מערך אוצר מילים רמה ב (כמו ב-app.js)
const wordsLevelB = [
    { english: 'as', hebrew: 'כמו, כאשר', image: 'https://picsum.photos/200/200?random=13' },
    { english: 'at', hebrew: 'ב-, אצל', image: 'https://picsum.photos/200/200?random=14' },
    { english: 'CamScanner', hebrew: 'אפליקציית סריקה', image: 'https://picsum.photos/200/200?random=15' },
    { english: 'castle', hebrew: 'טירה', image: 'https://picsum.photos/200/200?random=16' },
    { english: 'celebration', hebrew: 'חגיגה', image: 'https://picsum.photos/200/200?random=17' },
    { english: 'clean', hebrew: 'לנקות, נקי', image: 'https://picsum.photos/200/200?random=18' },
    { english: 'cupboard', hebrew: 'ארון מטבח', image: 'https://picsum.photos/200/200?random=19' },
    { english: 'each', hebrew: 'כל (אחד)', image: 'https://picsum.photos/200/200?random=20' },
    { english: 'END', hebrew: 'סוף', image: 'https://picsum.photos/200/200?random=21' },
    { english: 'everyone', hebrew: 'כולם', image: 'https://picsum.photos/200/200?random=22' },
    { english: 'fall', hebrew: 'ליפול', image: 'https://picsum.photos/200/200?random=23' },
    { english: 'flag', hebrew: 'דגל', image: 'https://picsum.photos/200/200?random=24' },
    { english: 'forest', hebrew: 'יער', image: 'https://picsum.photos/200/200?random=25' },
    { english: 'get', hebrew: 'לקבל, להשיג', image: 'https://picsum.photos/200/200?random=26' },
    { english: 'glass', hebrew: 'כוס, זכוכית', image: 'https://picsum.photos/200/200?random=27' },
    { english: 'guess', hebrew: 'לנחש', image: 'https://picsum.photos/200/200?random=28' },
    { english: 'ie', hebrew: 'כלומר', image: 'https://picsum.photos/200/200?random=29' },
    { english: 'kindof', hebrew: 'סוג של', image: 'https://picsum.photos/200/200?random=30' },
    { english: 'look', hebrew: 'להסתכל', image: 'https://picsum.photos/200/200?random=31' },
    { english: 'lunch', hebrew: 'ארוחת צהריים', image: 'https://picsum.photos/200/200?random=32' },
    { english: 'many', hebrew: 'הרבה', image: 'https://picsum.photos/200/200?random=33' },
    { english: 'mat', hebrew: 'שטיחון, מחצלת', image: 'https://picsum.photos/200/200?random=34' },
    { english: 'mirror', hebrew: 'מראה', image: 'https://picsum.photos/200/200?random=35' },
    { english: 'outside', hebrew: 'בחוץ', image: 'https://picsum.photos/200/200?random=36' },
    { english: 'refrigerator', hebrew: 'מקרר', image: 'https://picsum.photos/200/200?random=37' },
    { english: 'rice', hebrew: 'אורז', image: 'https://picsum.photos/200/200?random=38' },
    { english: 'rich', hebrew: 'עשיר', image: 'https://picsum.photos/200/200?random=39' },
    { english: 'roof', hebrew: 'גג', image: 'https://picsum.photos/200/200?random=40' },
    { english: 'sink', hebrew: 'כיור', image: 'https://picsum.photos/200/200?random=41' },
    { english: 'stove', hebrew: 'כיריים', image: 'https://picsum.photos/200/200?random=42' },
    { english: 'straw', hebrew: 'קשית', image: 'https://picsum.photos/200/200?random=43' },
    { english: 'supper', hebrew: 'ארוחת ערב', image: 'https://picsum.photos/200/200?random=44' },
    { english: 'thing', hebrew: 'דבר, חפץ', image: 'https://picsum.photos/200/200?random=45' },
    { english: 'think', hebrew: 'לחשוב', image: 'https://picsum.photos/200/200?random=46' },
    { english: 'throw', hebrew: 'לזרוק', image: 'https://picsum.photos/200/200?random=47' },
    { english: 'toilet', hebrew: 'שירותים', image: 'https://picsum.photos/200/200?random=48' },
    { english: 'us', hebrew: 'אותנו', image: 'https://picsum.photos/200/200?random=49' },
    { english: 'visit', hebrew: 'לבקר', image: 'https://picsum.photos/200/200?random=50' },
    { english: 'weekend', hebrew: 'סוף שבוע', image: 'https://picsum.photos/200/200?random=51' }
];

// Render vocabulary cards לפי רמה
function renderVocabCards() {
    const container = document.querySelector('.vocab-cards-container');
    container.innerHTML = '';
    let level = localStorage.getItem('vocabLevel') || 'A';
    const vocabArr = (level === 'B') ? wordsLevelB : words;
    vocabArr.forEach(word => {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.innerHTML = `
            <img src="${word.image}" alt="${word.english}">
            <div class="english">${word.english}</div>
            <div class="hebrew">${word.hebrew}</div>
        `;
        container.appendChild(card);
    });
}

// Show child image and score (placeholder logic)
function showChildInfo() {
    const userInfo = document.querySelector('.user-info');
    const childImage = document.getElementById('childImage');
    const childScore = document.getElementById('childScore');
    // Try to get user from localStorage or query param
    let user = localStorage.getItem('currentUser') || '';
    if (!user) {
        const params = new URLSearchParams(window.location.search);
        user = params.get('user') || '';
    }
    if (user) {
        userInfo.style.display = 'flex';
        // Set image path (assuming images are in /images/ and named by user)
        let imgFile = '';
        if (user.includes('חירות')) imgFile = 'images/harut.jpg';
        else if (user.includes('יאיר')) imgFile = 'images/yair.jpg';
        else if (user.includes('רות')) imgFile = 'images/rut.jpg';
        childImage.src = imgFile;
        childImage.alt = user;
        // TODO: Fetch cumulative score from backend
        childScore.textContent = 'ציון מצטבר: ...';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderVocabCards();
    showChildInfo();
}); 