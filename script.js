// Supabase Configuration
const SUPABASE_URL = 'https://xrgjngdnaelyiynbucqj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_nr4TmZqmaQ_GrBXJ56bQqA_MytVnH5p';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const form = document.getElementById('rating-form');
const starButtons = document.querySelectorAll('.star-btn');
const observationsInput = document.getElementById('observations');
const userNameInput = document.getElementById('user-name');
const errorMessage = document.getElementById('error-message');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnIcon = submitBtn.querySelector('.btn-icon');
const loader = document.getElementById('btn-loader');
const formCard = document.getElementById('form-card');
const successCard = document.getElementById('success-card');
const resetBtn = document.getElementById('reset-btn');

// State
let currentRating = 0;

// Initialize Lucide Icons
lucide.createIcons();

// Star Rating Logic
starButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentRating = parseInt(btn.getAttribute('data-value'));
        updateStars(currentRating);
        errorMessage.textContent = '';
    });

    btn.addEventListener('mouseenter', () => {
        const hoverValue = parseInt(btn.getAttribute('data-value'));
        updateStars(hoverValue);
    });

    btn.addEventListener('mouseleave', () => {
        updateStars(currentRating);
    });
});

function updateStars(value) {
    starButtons.forEach(btn => {
        const btnValue = parseInt(btn.getAttribute('data-value'));
        if (btnValue <= value) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (currentRating === 0) {
        errorMessage.textContent = 'Por favor selecciona una calificación';
        return;
    }

    setSubmitting(true);

    try {
        const { error } = await supabase
            .from('class_ratings')
            .insert([
                {
                    stars: currentRating,
                    observations: observationsInput.value,
                    user_name: userNameInput.value || null
                }
            ]);

        if (error) throw error;

        // Show Success
        formCard.classList.add('hidden');
        successCard.classList.remove('hidden');

    } catch (err) {
        console.error('Error submitting:', err);
        errorMessage.textContent = 'Hubo un error al enviar tu calificación. Por favor intenta de nuevo.';
    } finally {
        setSubmitting(false);
    }
});

function setSubmitting(isSubmitting) {
    submitBtn.disabled = isSubmitting;
    if (isSubmitting) {
        btnText.style.opacity = '0';
        btnIcon.style.opacity = '0';
        loader.style.display = 'block';
    } else {
        btnText.style.opacity = '1';
        btnIcon.style.opacity = '1';
        loader.style.display = 'none';
    }
}

// Reset Form
resetBtn.addEventListener('click', () => {
    form.reset();
    currentRating = 0;
    updateStars(0);
    successCard.classList.add('hidden');
    formCard.classList.remove('hidden');
});
