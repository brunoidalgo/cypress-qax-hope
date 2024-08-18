import orphanages from '../fixtures/orphanages.json';

// Atribuindo o primeiro orfanato ao nome orphanage pra ficar mais simples.
const orphanage = orphanages[0];

Cypress.Commands.add('visitWtihMockGeolocation', (url, lat = -21.1869184, long = -47.7780651) => {
    const mockGeolocation = (win, lat, long) => {
        cy.stub(win.navigator.geolaction, 'getCurrentPosition', cb => {
            return cb({ cords: { lat, long } });
        })
    };
    cy.visit(url, {
        onbeforeLoad: win => {
            mockGeolocation(win, lat, long);
        }
    });
});

Cypress.Commands.add('setMapPosition', (position) => {
    window.localStorage.setItem('hope-qa:latitude', position.latitude);
    window.localStorage.setItem('hope-qa:longitude', position.longitude);
});

Cypress.Commands.add('postOrphanage', () => {

    // Convertendo o arquivo para binário
    cy.fixture('images/' + orphanage.image, 'binary')
        // Transforma em String
        .then((image) => Cypress.Blob.binaryStringToBlob(image, 'image/png'))
        .then((blob) => {
            // Cadastra um orfanato via API com o Body correto, menos com a imagem.

            let formData = new FormData();
            formData.append('name', orphanage.name);
            formData.append('description', orphanage.description);
            formData.append('latitude', orphanage.position.latitude);
            formData.append('longitude', orphanage.position.longitude);
            formData.append('opening_hours', orphanage.opening_hours);
            formData.append('open_on_weekends', true);
            formData.append('images', blob, orphanage.image);

            cy.request({
                method: 'POST',
                url: 'http://localhost:3333/orphanages',
                headers: {
                    'content-type': 'multipart/form-data',
                },
                body: formData
            }).then(res => {
                expect(res.status).to.eq(201);
            })
        });
});
