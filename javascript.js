<script>
    window.addEventListener('scroll', function() {
        const container = document.querySelector('.container');
        if (window.scrollY > 50) {
            container.classList.add('scrolled');
        } else {
            container.classList.remove('scrolled');
        }
    });
</script>
