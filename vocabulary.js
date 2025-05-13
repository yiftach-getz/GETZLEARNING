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

// Render vocabulary cards
function renderVocabCards() {
    const container = document.querySelector('.vocab-cards-container');
    container.innerHTML = '';
    words.forEach(word => {
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