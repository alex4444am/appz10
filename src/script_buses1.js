function loadXML() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'buses.xml', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var xmlText = xhr.responseText;
            var xml = xhr.responseXML;

            document.getElementById('xml-original').textContent = xmlText;
            displayRoutes(xml, 'xml-table', false);
            displayRoutes(xml, 'xml-table-converted', true);
        }
    };
    xhr.send();
}

function displayRoutes(xml, elementId, convertValuesFlag) {
    var output = document.getElementById(elementId);
    var table = document.createElement('table');
    table.border = '1';

    var headers = ['Маршрут', 'Дата', 'Час', 'Ціна', 'Кількість місць', 'Зупинки'];
    var tr = document.createElement('tr');
    headers.forEach(function (header) {
        var th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });
    table.appendChild(tr);

    var routes = xml.getElementsByTagName('route');
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        var row = document.createElement('tr');

        var departure = route.getElementsByTagName('departure')[0].textContent;
        row.appendChild(createCell(departure));

        var date = route.getElementsByTagName('date')[0].textContent;
        if (convertValuesFlag) {
            date = convertValuesToWords(date);
        }
        row.appendChild(createCell(date));

        var time = route.getElementsByTagName('time')[0].textContent;
        if (convertValuesFlag) {
            time = convertValuesToWords(time);
        }
        row.appendChild(createCell(time));

        var price = route.getElementsByTagName('price')[0].textContent;
        if (convertValuesFlag) {
            price = convertValuesToWords(price);
        }
        row.appendChild(createCell(price));

        var seatsLeft = route.getElementsByTagName('seats_left')[0].textContent;
        if (convertValuesFlag) {
            seatsLeft = convertValuesToWords(seatsLeft);
        }
        row.appendChild(createCell(seatsLeft));

        var stops = Array.from(route.getElementsByTagName('stop'))
            .map(stop => convertStopsToWords(stop.textContent, convertValuesFlag))
            .join(', ');
        row.appendChild(createCell(stops));

        table.appendChild(row);
    }
    output.innerHTML = '';
    output.appendChild(table);
}

function convertStopsToWords(stopText, convertValuesFlag) {
    if (!convertValuesFlag) {
        return stopText;
    }

    return stopText.replace(/\d+/g, function(match) {
        return convertValuesToWords(match);
    });
}

function createCell(text) {
    var cell = document.createElement('td');
    cell.textContent = text;
    return cell;
}

function convertValuesToWords(value) {
    var numberMap = {
        '0': 'нуль',
        '1': 'один',
        '2': 'два',
        '3': 'три',
        '4': 'чотири',
        '5': 'п\'ять',
        '6': 'шість',
        '7': 'сім',
        '8': 'вісім',
        '9': 'дев\'ять'
    };

    if (value.match(/\d{4}-\d{2}-\d{2}/)) {
        var dateParts = value.split('-');
        if (dateParts.length === 3) {
            var day = convertToWords(dateParts[2]);
            var month = convertMonthToWords(dateParts[1]);
            var year = convertToWords(dateParts[0]);
            return `${day} ${month} ${year}`;
        }
    }

    if (value.match(/\d{2}:\d{2}/)) {
        var timeParts = value.split(':');
        var hours = convertToWords(timeParts[0]);
        var minutes = convertToWords(timeParts[1]);
        return `${hours} година ${minutes} хвилин`;
    }

    return value.split('').map(function (char) {
        return numberMap[char] ? numberMap[char] + ' ' : char;
    }).join('');
}

function convertToWords(number) {
    var numberMap = {
        '0': 'нуль',
        '1': 'один',
        '2': 'два',
        '3': 'три',
        '4': 'чотири',
        '5': 'п\'ять',
        '6': 'шість',
        '7': 'сім',
        '8': 'вісім',
        '9': 'дев\'ять'
    };

    return number.split('').map(function (char) {
        return numberMap[char];
    }).join(' ');
}

function convertMonthToWords(month) {
    var monthMap = {
        '01': 'січня',
        '02': 'лютого',
        '03': 'березня',
        '04': 'квітня',
        '05': 'травня',
        '06': 'червня',
        '07': 'липня',
        '08': 'серпня',
        '09': 'вересня',
        '10': 'жовтня',
        '11': 'листопада',
        '12': 'грудня'
    };
    return monthMap[month];
}

window.onload = loadXML;
