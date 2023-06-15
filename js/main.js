window.addEventListener('load', () => {

    const inputPais = document.getElementById('input-pais');
    const inputRegion = document.getElementById('input-region');
    const inputCiudad = document.getElementById('input-ciudad');
    const form = document.getElementById('form');
    const msgError = document.querySelector('.error');
    const iconGrado = document.querySelector('.grado-actual-icon');
    const paisDeploy = document.getElementById('pais-deploy');
    const regionDeploy = document.getElementById('region-deploy');
    const ciudadDeploy = document.getElementById('ciudad-deploy');
    const gradoActual = document.querySelector('.grado-actual');
    const sensacionTermica = document.querySelector('.sensacion-termica');
    const humedad = document.querySelector('.humedad');
    const precipitacion = document.querySelector('.precipitacion');
    const velocidadDelViento = document.querySelector('.velocidad-viento');
    const nubes = document.querySelector('.nubes');

    async function pedirData(pais,region,ciudad) {
        try {
            const apiKey = 'b3fdd3a63d9742febfc213157231406'; 

            const respuesta = await fetch(
            `HTTPS://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${pais} ${region} ${ciudad}&aqi=no`
            );
            const resultado = await respuesta.json();
            cargarData(resultado);
        } catch {
            const img = document.createElement('img');
            img.src = 'think.png';
            img.classList.add('icono-img-pensativo');
            img.alt = 'Icono De Persona Pensando';

            iconGrado.appendChild(img);

            paisDeploy.innerText = '...';
            regionDeploy.innerText = '...';
            ciudadDeploy.innerText = '...';
            gradoActual.innerText = '...';
            sensacionTermica.innerText = 'Sensación Térmica: ...';
            humedad.innerText = 'Humedad: ...';
            precipitacion.innerText = 'Precipitación: ...';
            velocidadDelViento.innerText = 'Velocidad Del Viento: ...';
            nubes.innerText = 'Cobertura de nubes: ...';

            Swal.fire({
                position: 'center',
                icon: 'error',    
                html: `<p style="font-size: 1.3rem; font-weight:500;">Ups! No se encontró el lugar</p>`,
                showConfirmButton: true,
            })
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if(inputPais.value == '' || inputRegion.value == '' || inputCiudad.value == '') {
            msgError.style.display = 'block';
            setTimeout(() => {
                msgError.style.display = 'none';
            }, 1500);
        } else {
            iconGrado.innerHTML = '';
            pedirData(inputPais.value,inputRegion.value,inputCiudad.value);
            form.reset();
            inputPais.focus();
        }
        
    })

    function cargarData(res) {

        paisDeploy.innerText = res.location.country;
        regionDeploy.innerText = res.location.region;
        ciudadDeploy.innerText = res.location.name;

        const img = document.createElement('img');
        img.classList.add('icono-grado-img');
        img.src = res.current.condition.icon;
        img.setAttribute('alt',res.current.condition.text);
        img.setAttribute('title',res.current.condition.text);
        iconGrado.style.height = '170px';
        iconGrado.style.width = '170px';

        iconGrado.appendChild(img);

        gradoActual.innerText = `${res.current.temp_c}°C`;

        sensacionTermica.innerText = `Sensación Térmica: ${res.current.feelslike_c}°C`;

        humedad.innerText = `Humedad: ${res.current.humidity}%`;

        precipitacion.innerText = `Precipitación: ${res.current.precip_mm}mm`;

        velocidadDelViento.innerText = `Velocidad Del Viento: ${res.current.wind_kph}KM/H`;
    
        nubes.innerText = `Cobertura de nubes: ${res.current.cloud}%`;
    }
})

