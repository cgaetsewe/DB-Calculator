class Inputs {
    constructor(inputPower, gainLoss) {
        this.inputPower = inputPower;
        this.gainLoss = gainLoss;
    }
}
class Element {
    constructor(ifl, iflValue) {
        this.ifl = ifl;
        this.iflValue = iflValue;
        this.connector = connector;
        this.connectorValue = connectorValue;
    }
}
class UI {
    calculateOutputPowerdBm(inputs) {
        const outputPowerinDbm = inputs.inputPower + inputs.gainLoss;
        document.getElementById('dBm').innerHTML = outputPowerinDbm.toFixed(1) + 'dBm';
        document.getElementById('input-capture').innerHTML = outputPowerinDbm.toFixed(1) + 'dBm';
        document.getElementById('gain-capture').innerHTML = inputs.gainLoss.toFixed(1) + 'dB';
        const ui = new UI();
        ui.convertDbmToW(outputPowerinDbm);
        ui.convertDbmToDbW(outputPowerinDbm);
    }
    convertDbmToW(outputPowerinDbm) {
        let outputPowerinW = 0.001 * Math.pow(10, (outputPowerinDbm/10));

        switch(true) {
            case outputPowerinDbm >= 120:
                outputPowerinW = outputPowerinW / 1000000000;
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(0) + ' GW';
                break;
            case outputPowerinDbm >= 90 && outputPowerinDbm < 120:
                outputPowerinW = outputPowerinW / 1000000;
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(1) + ' MW';
                break;
            case outputPowerinDbm >= 60 && outputPowerinDbm < 90:
                outputPowerinW = outputPowerinW / 1000;
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(1) + ' KW'; 
                break;
            case outputPowerinDbm >= 0 && outputPowerinDbm < 30:
                outputPowerinW = outputPowerinW * 1000;
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(1) + 'mW';
                break;
            case outputPowerinDbm < 0:
                outputPowerinW = outputPowerinW * 1000000;
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(3) + ' uW';
                break;
            default:
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(1) + ' W';
    }
}
    convertDbmToDbW(outputPowerinDbm) {
        const outputPowerinDbW = outputPowerinDbm - 30;
        document.getElementById('dBW').innerHTML = outputPowerinDbW.toFixed(1) + 'dBW';
    }
    addNewElement() {
        const thead = document.createElement('thead');
        document.getElementById('gain-loss-table').appendChild(thead);
        document.getElementById('gain-loss').classList = 'hide'; 
        document.getElementById('gain-loss-table').classList = 'elements'; 
        var ui = new UI();
        thead.innerHTML = `
        <tr>
            <th>Component</th>
            <th class="margin">Value</th>
        </tr>
        <tbody>
            <tr>
            <td>             
                <select id="component" name="units" id="units" class="units">
                    <option >IFL</option>
                    <option value="Connector">Connector</option>
                    <option value="Up-Converter">Up-Converter</option>
                    <option value="HPA">HPA</option>
                    <option value="Combiner">Combiner</option>
                    <option value="RF-coupler">RF-coupler</option>
                    <option value="Ant-Feed">Ant-Feed</option>
                    <option value="Ant-Gain">Ant-Gain</option>
                </select>
            </td>
            <td>
                <input value="0" id="componentValue" type="text" class="input">
            </td>
            <td>
                <a href=""><i class="fas fa-minus-circle"></i></a>
            </td>
            </tr>
        </tbody>
        `;
        let component;
        let componentValue;

        component = `${component.va}`
        componentValue = parseFloat(document.getElementById('componentValue'));
        ui.clearInputs();
    }
    clearInputs() {
        document.getElementById('input-power').value = '0.0';
        document.getElementById('gain-loss').value = '0.0';
        document.getElementById('dBm').innerHTML = '0.0' + 'dBm';
        document.getElementById('dBW').innerHTML = '-30.0' + 'dBW';
        document.getElementById('W').innerHTML = '1.0' + 'mW';
        document.getElementById('input-capture').innerHTML = '0.0' + 'dBm';
        document.getElementById('gain-capture').innerHTML = '0.0' + 'dB';
    }
}
class Store {
    static getElements() {
        let elements;
        if(localStorage.getItem('Elements') === null) {
            elements = [];
        } else {
            elements = JSON.parse(localStorage.getItem('Elements'));
        }
        return elements;
    }
    static addElementsToStorage(element) {
        const elements = Store.getElements();
        elements.push(element);
        localStorage.setItem('Elements', JSON.stringify(elements));
        console.log(element); 
    }
}
document.getElementById('form').addEventListener('submit', function(e) {
    let inputPower = parseFloat(document.getElementById('input-power').value);
    let gainLoss = parseFloat(document.getElementById('gain-loss').value);
    const gainLossTable = document.getElementById('gain-loss-table');
    const inputPower_units = document.getElementById('units').value;
    const ui = new UI();
    const inputs = new Inputs(inputPower, gainLoss);
    
    if(inputPower_units !== 'dBm') {
        convertToDbm(inputs);
    } 
    if(gainLossTable.classList.contains('elements')) {
        const element = new Element(component.value, componentValue.value, );
        Store.addElementsToStorage(element);
    } else {
        ui.calculateOutputPowerdBm(inputs);
    }
    e.preventDefault();
});
const convertToDbm = function(inputs) {
    const inputPower_units = document.getElementById('units').value;
    switch(inputPower_units) {
        case 'dBW':
            inputs.inputPower = inputs.inputPower + 30;
            break;
        case 'W':
            inputs.inputPower = 10 * Math.log10(1000 * inputs.inputPower);
            break;
        default:
        }
    return inputs;
};
document.getElementById('drop-down').addEventListener('click', function() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById('add-new-element').onclick = function() {
      const ui = new UI();
      ui.addNewElement();
    }
});
window.onclick = function(e) {
    if (!e.target.classList.contains('dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


