// Fungsi untuk format tanggal menjadi Date Object
function formatDate(dateString) {
    const [day, month, year] = dateString.split(" ");
    const monthNames = {
        'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3, 'Mei': 4, 'Juni': 5,
        'Juli': 6, 'Agustus': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
    };
    return new Date(year, monthNames[month], day);
}

// Fungsi untuk generate produk dari JSON
function generateProducts(containerId, category) {
    const container = document.getElementById(containerId);
    const filteredProducts = products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const expiryDate = formatDate(product.expiry);
        const today = new Date();
        const isExpired = expiryDate < today;

        const expiredLabel = isExpired ? `<div class="expired-label">Expired</div>` : '';
        
        const productCard = `
            <div class="relative bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 dark:bg-gray-700">
                ${expiredLabel}
                <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover rounded-md">
                <h2 class="text-xl font-semibold mt-4 dark:text-white">${product.title}</h2>
                <p class="text-gray-600 dark:text-gray-300">Gunakan kode: <strong>${product.code}</strong></p>
                <p class="text-gray-500 text-sm dark:text-gray-400">Berlaku hingga: ${product.expiry}</p>
                <a href="${product.link}" class="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">Dapatkan Sekarang</a>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

// Generate produk berdasarkan kategori
generateProducts('promo-terbaik', 'pilihan');
generateProducts('promo-ebook', 'ebook');

// Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggleModeButton = document.getElementById('toggleMode');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Cek preferensi mode dari localStorage
    const currentMode = localStorage.getItem('theme') || 'light';
    if (currentMode === 'dark') {
        document.documentElement.classList.add('dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }

    toggleModeButton.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');

        if (document.documentElement.classList.contains('dark')) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
            localStorage.setItem('theme', 'dark');
        } else {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
            localStorage.setItem('theme', 'light');
        }
    });
});

