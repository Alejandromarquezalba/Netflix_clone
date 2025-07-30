export default function MoviesPage() {
    return (
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#222', color: 'white', minHeight: '100vh' }}>
            <h1>¡Bienvenido a la sección de Películas!</h1>
            <p>Este contenido solo es visible para usuarios autenticados.</p>
            <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGd6N25jZjRldXN4MmxvNG12ZWQyMTh4em51b2FsaWw3c3E4d293NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYH8G8x3czw6UMM/giphy.gif" 
            alt="Palomitas de maíz" 
            style={{ maxWidth: '300px', marginTop: '20px', borderRadius: '8px' }} 
            />
            <p style={{ marginTop: '20px', fontSize: '0.9em' }}>¡Disfruta tu cine en casa!</p>
        </div>
        );
    }