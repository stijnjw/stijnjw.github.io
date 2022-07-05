let inh = null

function openTable(table){
    let newtable = {}
    for (const property in table) {
        newtable[table[property]['slot']] = table[property]
    }
    console.log(newtable)
    inh = newtable
    return newtable
}

function getdbString(table){
    let newtable = []
    for (const property in table) {
        newtable.push(table[property])
    }
    return newtable;
}

var stringToColour = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

function getTextForId(element, table){
    let id = element.id
    if (!table[id]) return `LEEG`;

    element.style.backgroundColor = stringToColour(table[id]['name']);
    let returnstring = ''

    for (const property in table[id]) {
        if (property == 'info') {
            if (Object.keys(table[id][property])[0]) {
                returnstring += `info:<br>`
                for (const propertya in table[id][property]) {
                    if (typeof table[id][property][propertya] == 'object') {
                        returnstring += `&nbsp;&nbsp;&nbsp;${propertya}: [Object] (zie console via f12)<br>`
                    } else {
                        returnstring += `&nbsp;&nbsp;&nbsp;${propertya}: ${table[id][property][propertya]}<br>`
                    }
                }
            }
        } else {
            returnstring += `${property}: ${table[id][property]}<br>`
        }
    }
    return returnstring;
}

function handleRequest(){
    document.getElementById('lebuttom').disabled = true
    let string = document.getElementById('vraag').value
    let parsed = JSON.parse(string)
    //console.log(parsed)
    let newtable = openTable(parsed)

    let tableelement = document.getElementById("table");

    for (let i = 0; i < 6; i++) {
        let row = tableelement.insertRow();
        let cell1 = row.insertCell(0); cell1.id = i*5+1
        let cell2 = row.insertCell(1); cell2.id = i*5+2
        let cell3 = row.insertCell(2); cell3.id = i*5+3
        let cell4 = row.insertCell(3); cell4.id = i*5+4
        let cell5 = row.insertCell(4); cell5.id = i*5+5
        
        cell1.innerHTML = getTextForId(cell1, newtable);
        cell2.innerHTML = getTextForId(cell2, newtable);
        cell3.innerHTML = getTextForId(cell3, newtable);
        cell4.innerHTML = getTextForId(cell4, newtable);
        cell5.innerHTML = getTextForId(cell5, newtable);

        cell1.style.border = '1px solid black'; cell1.style.padding = '8px';
        cell2.style.border = '1px solid black'; cell2.style.padding = '8px';
        cell3.style.border = '1px solid black'; cell3.style.padding = '8px';
        cell4.style.border = '1px solid black'; cell4.style.padding = '8px';
        cell5.style.border = '1px solid black'; cell5.style.padding = '8px';
    }
    document.getElementById('welkeactie').disabled = false
    document.getElementById('lebuttom2').disabled = false

}

function doSelectType(){
    document.getElementById('welkeslot').disabled = false
    document.getElementById('welkeactie').disabled = true
    document.getElementById('lebuttom2').disabled = true
    if (document.getElementById('welkeactie').selectedIndex == 0) {
        document.getElementById('nextform').innerHTML = 'type: <input type="text" name="wgefr" id="itemtype"> (bijv. item, weapon) <br>name: <input type="text" name="wgefffffr" id="itemname"> (inspawnnaam) <br>amount: <input type="text" name="wdwgefr" id="itemamount"><br>info: <input type="text" name="wgefawdr" id="iteminfo"> (bijv. {"birthdate":"1980-06-28","firstname":"test","nationality":"nl","lastname":"account","gender":0,"citizenid":"KKR36953","nationality":"DE"})<br><input id="lebuttom3" type="button" onclick="doAddItem()" value="Uitvoeren"><br>';
    } else if (document.getElementById('welkeactie').selectedIndex == 1) {
        document.getElementById('extrainput').innerHTML = '<input id="lebuttom4" type="button" onclick="chooseSlot()" value="Selecteer dit slot"><br>';
    } else if (document.getElementById('welkeactie').selectedIndex == 2) {
        document.getElementById('extrainput').innerHTML = '<input id="lebuttom4" type="button" onclick="deleteSlot()" value="Verwijder deze slot"><br>';
    }
}

function doAddItem(){
    let slot = document.getElementById('welkeslot').value
    let type = document.getElementById('itemtype').value
    let name = document.getElementById('itemname').value
    let amount = document.getElementById('itemamount').value
    let info = document.getElementById('iteminfo').value

    if (!slot) return alert('Verplicht attribuut SLOT mist.');
    if (isNaN(Number(slot))) return alert('Attribuut SLOT moet een nummer zijn.');
    if (slot < 1 || slot > 30) return alert('Attribuut SLOT moet tussen 1 en 30 liggen.');
    if (inh[slot]) return alert('Dit SLOT is niet leeg.');
    if (!type) return alert('Verplicht attribuut TYPE mist.');
    if (!name) return alert('Verplicht attribuut NAME mist.');
    if (!amount) return alert('Verplicht attribuut AMOUNT mist.');
    if (isNaN(Number(amount))) return alert('Attribuut AMOUNT moet een nummer zijn.');
    if (!info) {info = []} else {info = JSON.parse(info)};

    let table = {
        slot,
        type,
        name,
        amount,
        info,
    }

    inh[slot] = table

    document.getElementById('RESULT').innerHTML = 'Nieuwe string:<br>' + JSON.stringify(getdbString(inh))//JSON.stringify(inh);

    let tableelement = document.getElementById("table");
    tableelement.innerHTML = ''

    let newtable = inh

    for (let i = 0; i < 6; i++) {
        let row = tableelement.insertRow();
        let cell1 = row.insertCell(0); cell1.id = i*5+1
        let cell2 = row.insertCell(1); cell2.id = i*5+2
        let cell3 = row.insertCell(2); cell3.id = i*5+3
        let cell4 = row.insertCell(3); cell4.id = i*5+4
        let cell5 = row.insertCell(4); cell5.id = i*5+5
        
        cell1.innerHTML = getTextForId(cell1, newtable);
        cell2.innerHTML = getTextForId(cell2, newtable);
        cell3.innerHTML = getTextForId(cell3, newtable);
        cell4.innerHTML = getTextForId(cell4, newtable);
        cell5.innerHTML = getTextForId(cell5, newtable);

        cell1.style.border = '1px solid black'; cell1.style.padding = '8px';
        cell2.style.border = '1px solid black'; cell2.style.padding = '8px';
        cell3.style.border = '1px solid black'; cell3.style.padding = '8px';
        cell4.style.border = '1px solid black'; cell4.style.padding = '8px';
        cell5.style.border = '1px solid black'; cell5.style.padding = '8px';
    }
}

function chooseSlot(){
    let slot = document.getElementById('welkeslot').value

    if (!slot) return alert('Verplicht attribuut SLOT mist.');
    if (isNaN(Number(slot))) return alert('Attribuut SLOT moet een nummer zijn.');
    if (slot < 1 || slot > 30) return alert('Attribuut SLOT moet tussen 1 en 30 liggen.');
    if (!inh[slot]) return alert('Dit SLOT is leeg.')

    let type = inh[slot]['type']
    let name = inh[slot]['name']
    let amount = inh[slot]['amount']
    let info = inh[slot]['info']

    document.getElementById('nextform').innerHTML = 'type: <input type="text" name="wgefr" id="itemtype"> (bijv. item, weapon) <br>name: <input type="text" name="wgefffffr" id="itemname"> (inspawnnaam) <br>amount: <input type="text" name="wdwgefr" id="itemamount"><br>info: <input type="text" name="wgefawdr" id="iteminfo"> (bijv. {"birthdate":"1980-06-28","firstname":"test","nationality":"nl","lastname":"account","gender":0,"citizenid":"KKR36953","nationality":"DE"})<br><input id="lebuttom3" type="button" onclick="doChangeItem()" value="Uitvoeren"><br>';

    document.getElementById('itemtype').value = type
    document.getElementById('itemname').value = name
    document.getElementById('itemamount').value = amount
    document.getElementById('iteminfo').value = JSON.stringify(info)
}

function doChangeItem(){
    let slot = document.getElementById('welkeslot').value
    let type = document.getElementById('itemtype').value
    let name = document.getElementById('itemname').value
    let amount = document.getElementById('itemamount').value
    let info = document.getElementById('iteminfo').value

    if (!slot) return alert('Verplicht attribuut SLOT mist.');
    if (isNaN(Number(slot))) return alert('Attribuut SLOT moet een nummer zijn.');
    if (slot < 1 || slot > 30) return alert('Attribuut SLOT moet tussen 1 en 30 liggen.');
    if (!type) return alert('Verplicht attribuut TYPE mist.');
    if (!name) return alert('Verplicht attribuut NAME mist.');
    if (!amount) return alert('Verplicht attribuut AMOUNT mist.');
    if (isNaN(Number(amount))) return alert('Attribuut SLOT moet een nummer zijn.');
    if (!info) {info = []} else {info = JSON.parse(info)};

    let table = {
        slot,
        type,
        name,
        amount,
        info,
    }

    inh[slot] = table

    document.getElementById('RESULT').innerHTML = 'Nieuwe string:<br>' + JSON.stringify(getdbString(inh))//JSON.stringify(inh);

    let tableelement = document.getElementById("table");
    tableelement.innerHTML = ''

    let newtable = inh

    for (let i = 0; i < 6; i++) {
        let row = tableelement.insertRow();
        let cell1 = row.insertCell(0); cell1.id = i*5+1
        let cell2 = row.insertCell(1); cell2.id = i*5+2
        let cell3 = row.insertCell(2); cell3.id = i*5+3
        let cell4 = row.insertCell(3); cell4.id = i*5+4
        let cell5 = row.insertCell(4); cell5.id = i*5+5
        
        cell1.innerHTML = getTextForId(cell1, newtable);
        cell2.innerHTML = getTextForId(cell2, newtable);
        cell3.innerHTML = getTextForId(cell3, newtable);
        cell4.innerHTML = getTextForId(cell4, newtable);
        cell5.innerHTML = getTextForId(cell5, newtable);

        cell1.style.border = '1px solid black'; cell1.style.padding = '8px';
        cell2.style.border = '1px solid black'; cell2.style.padding = '8px';
        cell3.style.border = '1px solid black'; cell3.style.padding = '8px';
        cell4.style.border = '1px solid black'; cell4.style.padding = '8px';
        cell5.style.border = '1px solid black'; cell5.style.padding = '8px';
    }
}

function deleteSlot(){
    let slot = document.getElementById('welkeslot').value

    if (!slot) return alert('Verplicht attribuut SLOT mist.');
    if (isNaN(Number(slot))) return alert('Attribuut SLOT moet een nummer zijn.');
    if (slot < 1 || slot > 30) return alert('Attribuut SLOT moet tussen 1 en 30 liggen.');
    if (!inh[slot]) return alert('Attribuut SLOT bestaat niet en kan daarmee niet verwijderd worden.');

    //let removeIndex = inh.indexOf(slot)
    delete inh[slot];
    //inh[slot] = null;

    document.getElementById('RESULT').innerHTML = 'Nieuwe string:<br>' + JSON.stringify(getdbString(inh))//JSON.stringify(inh);
    
    let tableelement = document.getElementById("table");
    tableelement.innerHTML = ''

    let newtable = inh

    for (let i = 0; i < 6; i++) {
        let row = tableelement.insertRow();
        let cell1 = row.insertCell(0); cell1.id = i*5+1
        let cell2 = row.insertCell(1); cell2.id = i*5+2
        let cell3 = row.insertCell(2); cell3.id = i*5+3
        let cell4 = row.insertCell(3); cell4.id = i*5+4
        let cell5 = row.insertCell(4); cell5.id = i*5+5
        
        cell1.innerHTML = getTextForId(cell1, newtable);
        cell2.innerHTML = getTextForId(cell2, newtable);
        cell3.innerHTML = getTextForId(cell3, newtable);
        cell4.innerHTML = getTextForId(cell4, newtable);
        cell5.innerHTML = getTextForId(cell5, newtable);

        cell1.style.border = '1px solid black'; cell1.style.padding = '8px';
        cell2.style.border = '1px solid black'; cell2.style.padding = '8px';
        cell3.style.border = '1px solid black'; cell3.style.padding = '8px';
        cell4.style.border = '1px solid black'; cell4.style.padding = '8px';
        cell5.style.border = '1px solid black'; cell5.style.padding = '8px';
    }

}

function restart(){
    window.location.reload();
}