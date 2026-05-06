const v18 = {
    accounts: ["USA", "UK", "Dubai", "Canada", "Germany", "Turkey", "Australia", "Saudi Arabia"],
    selected: "",
    serviceID: "Noman-Store",
    templateID: "template_n7u5vup",

    init() {
        this.render();
        this.setupSearch();
    },

    render() {
        const grid = document.getElementById('accountGrid');
        grid.innerHTML = this.accounts.map(name => `
            <div class="neon-card" data-name="${name.toLowerCase()}">
                <i class="fab fa-tiktok" style="font-size:40px; color:var(--neon);"></i>
                <h3 style="margin:15px 0;">${name} Account</h3>
                <p style="font-size:22px; font-weight:800; color:white;">Rs 1,200</p>
                <button class="order-btn" style="margin-top:15px;" onclick="v18.openOrder('${name}')">Order Now</button>
            </div>
        `).join('');
    },

    setupSearch() {
        document.getElementById('mainSearch').addEventListener('keyup', (e) => {
            const val = e.target.value.toLowerCase();
            document.querySelectorAll('.neon-card').forEach(card => {
                const name = card.getAttribute('data-name');
                card.style.display = name.includes(val) ? "block" : "none";
            });
        });
    },

    toggleDrawer(show) {
        document.getElementById('orderDrawer').classList.toggle('active', show);
    },

    openOrder(name) {
        this.selected = name;
        document.getElementById('orderTitle').innerText = name + " Order";
        this.toggleDrawer(true);
    },

    async confirmOrder() {
        const name = document.getElementById('custName').value;
        const email = document.getElementById('custEmail').value;

        if(!name || !email) return alert("Bhai, Details fill karein!");

        try {
            // 1. EmailJS Notification
            await emailjs.send(this.serviceID, this.templateID, {
                from_name: name,
                user_email: email,
                product: this.selected
            });

            // 2. Database Save (PHP)
            const res = await fetch('order.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, item: this.selected })
            });

            alert("✅ Order Placed! Email sent to Malik Noman Store.");
            this.toggleDrawer(false);
        } catch (err) {
            alert("Error: " + err);
        }
    }
};
v18.init();