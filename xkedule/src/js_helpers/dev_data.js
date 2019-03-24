const events = {
    "1" : {
        "id": "1",
        "title": "Fake1",
        "description": "Wena choro",
        "links": {
            "CSS height": {"name": "CSS height", "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/height#Values"},
            "CSS width": {"name": "CSS width", "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/width#Values"}
        },
        "date_start": new Date('March 24, 2019 12:09:00'),
        "date_end": new Date('March 24, 2019 15:59:00'),
        "tag_ids": []

    },
    "2" : {
        "id": "2",
        "title": "Fake2",
        "description": "",
        "link": "https://www.ausopen.com",
        "date_start": new Date('March 24, 2019 18:00:00'),
        "date_end": new Date('March 24, 2019 19:30:00'),
        "tag_ids": ["2"]

    },
    "3" : {
        "id": "3",
        "title": "Fake3",
        "description": "",
        "link": "https://www.ausopen.com",
        "date_start": new Date('March 24, 2019 15:00:00'),
        "date_end": new Date('March 24, 2019 16:59:00'),
        "tag_ids": []

    },
    "4" : {
        "id": "4",
        "title": "Fake4",
        "description": "",
        "link": "https://www.ausopen.com",
        "date_start": new Date('March 24, 2019 5:30:00'),
        "date_end": new Date('March 24, 2019 11:59:00')

    },
    "5" : {
        "id": "5",
        "title": "Fake5",
        "description": "",
        "link": "https://www.ausopen.com",
        "date_start": new Date('March 24, 2019 06:00:00'),
        "date_end": new Date('March 24, 2019 10:00:00')

    },
    "6" : {
        "id": "6",
        "title": "Fake6",
        "description": "",
        "link": "https://www.ausopen.com",
        "date_start": new Date('March 24, 2019 05:00:00'),
        "date_end": new Date('March 24, 2019 06:59:00')

    },
    "7" : {
        "id": "7",
        "title": "Fake7",
        "description": "",
        "link": "https://www.ausopen.com",
        "date_start": new Date('March 24, 2019 21:00:00'),
        "date_end": new Date('March 24, 2019 22:59:00')

    },
    "8" : {
        "id": "8",
        "title": "Fake8",
        "description": "",
        "link": "https://www.ausopen.com",
        "date_start": new Date('March 24, 2019 19:00:00'),
        "date_end": new Date('March 24, 2019 20:59:00')

    },
    "9" : {
        "id": "9",
        "title": "Fake two days 6",
        "description": "",
        "link": "https://www.ausopen.com",
        "date_start": new Date('March 24, 2019 18:00:00'),
        "date_end": new Date('March 24, 2019 19:59:00')

    },
    "10" : {
        "id": "10",
        "title": "Fake two days 10",
        "link": "https://www.ausopen.com",
        "date_start": new Date('March 24, 2019 05:00:00'),
        "date_end": new Date('March 24, 2019 06:59:00')

    },
    "11" : {
        "id": "11",
        "title": "Fake11",
        "link": "https://www.ausopen.com",
        "date_start": new Date('January 31, 2019 05:00:00'),
        "date_end": new Date('January 31, 2019 06:59:00')

    },
    "12" : {
        "id": "12",
        "title": "Fake12",
        "link": "https://www.ausopen.com",
        "date_start": new Date('March 20, 2019 05:00:00'),
        "date_end": new Date('March 20, 2019 06:59:00')

    },

    "13" : {
        "id": "13",
        "title": "Final AOasdasdasasdasdasdasdadasdasdkasjdlkasjdlkdasdasdasdasdasd",
        "date_start": new Date('March 24, 2019 01:00:00'),
        "date_end": new Date('March 24, 2019 02:59:00')

    },

    "14" : {
        "id": "14",
        "title": "Final AOasdasdasasdasdasdasdadasdasdkasjdlkasjdlkdasdasdasdasdasd",
        "link": "https://www.ausopen.com",
        "date_start": new Date('August 19, 1975 01:00:00'),
        "date_end": new Date('August 19, 1975 04:59:00')

    }
};

// Colors and styles defined in:
// https://www.figma.com/file/OhtFZI18vLZ8YmwLHj0nyrPg/EventColors?node-id=0%3A1

const user_tags = {
    "1": {
        "id": "1",
        "name": "IIC2233 - Inteligencia Artificial",
        "style": "ocean",
        actual_uses: 0
    },
    "2": {
        "id": "2",
        "name": "Gym",
        "style": "rose",
        actual_uses: 2
    },
    "3": {
        "id": "3",
        "name": "Reunion",
        "style": "seafoam",
        actual_uses: 1
    },
    "4": {
        "id": "4",
        "name": "Trabajo grupal",
        "style": "blonde",
        actual_uses: 3
    },
    "5": {
        "id": "5",
        "name": "Trabajo opcional",
        "style": "violet",
        actual_uses: 0
    },
    "6": {
        "id": "6",
        "name": "Prueba",
        "style": "lapis",
        actual_uses: 4
    },
    "7": {
        "id": "7",
        "name": "ICS1234 - Microeconomia",
        "style": "lilac",
        actual_uses: 0
    },
    "8": {
        "id": "8",
        "name": "IIC3333 - Capstone",
        "style": "violet",
        actual_uses: 0
    },
    "9": {
        "id": "9",
        "name": "IIC3212",
        "style": "seafoam",
        actual_uses: 0
    }

}

export {events, user_tags}
