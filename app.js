class Inputs {
    constructor(inputPower, gain, loss) {
        this.inputPower = inputPower;
        this.gain = gain;
        this.loss = loss;
    }
}
class UI {
    calculateOutputPowerdBm(inputs) {
        localStorage.setItem('inputs',JSON.stringify(inputs));
        const outputPowerinDbm = inputs.inputPower + inputs.gain + (-inputs.loss);
        document.getElementById('dBm').innerHTML = outputPowerinDbm.toFixed(1) + 'dBm';
        document.getElementById('input-capture').innerHTML = inputs.inputPower.toFixed(1) + 'dBm';
        document.getElementById('gain-capture').innerHTML = inputs.gain.toFixed(1) + 'dB';
        document.getElementById('loss-capture').innerHTML = inputs.loss.toFixed(1) + 'dB';
        const ui = new UI();
        ui.convertDbmToW(outputPowerinDbm);
        ui.convertDbmToDbW(outputPowerinDbm);
    }
    convertToDbm = function(inputs) {
        const units = document.getElementById('units').value;
        switch(units) {
            case 'dBW':
                inputs.inputPower = inputs.inputPower + 30;
                break;
            case 'W':
                inputs.inputPower = 10 * Math.log10(1000 * inputs.inputPower);
                break;
            case 'mW':
                inputs.inputPower = (10 * Math.log10(1000 * inputs.inputPower)-30);
                break;
            default:
            }
        return inputs;
    }
    convertDbmToW(outputPowerinDbm) {
        let outputPowerinW = 0.001 * Math.pow(10, (outputPowerinDbm/10));
        switch(true) {
            case outputPowerinDbm >= 120:
                outputPowerinW = outputPowerinW / 1000000000;
                document.getElementById('W').innerHTML = '>1.0' + 'GW';
                break;
            case outputPowerinDbm >= 90 && outputPowerinDbm < 120:
                outputPowerinW = outputPowerinW / 1000000;
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(1) + 'MW';
                break;
            case outputPowerinDbm >= 60 && outputPowerinDbm < 90:
                outputPowerinW = outputPowerinW / 1000;
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(1) + 'KW'; 
                break;
            case outputPowerinDbm >= 0 && outputPowerinDbm < 30:
                outputPowerinW = outputPowerinW * 1000;
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(1) + 'mW';
                break;
            case outputPowerinDbm < 0:
                outputPowerinW = outputPowerinW * 1000000;
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(3) + 'uW';
                break;
            default:
                document.getElementById('W').innerHTML = outputPowerinW.toFixed(1) + 'W';
        }
    }
    convertDbmToDbW(outputPowerinDbm) {
        const outputPowerinDbW = outputPowerinDbm - 30;
        document.getElementById('dBW').innerHTML = outputPowerinDbW.toFixed(1) + 'dBW';
    }
    resetValue(target) {
        if(target.className === "clr") {
            target.parentElement.firstChild.value = 0;
            document.getElementById('form').mySubmit.click();
        }
    }
    clearInputs() {
        localStorage.clear();
        document.getElementById('input-power').value = '0';
        document.getElementById('gain').value = '0';
        document.getElementById('loss').value = '0';
        document.getElementById('dBm').innerHTML = '0.0' + 'dBm';
        document.getElementById('dBW').innerHTML = '-30.0' + 'dBW';
        document.getElementById('W').innerHTML = '1.0' + 'mW';
        document.getElementById('input-capture').innerHTML = '0.0' + 'dBm';
        document.getElementById('gain-capture').innerHTML = '0.0' + 'dB';
        document.getElementById('loss-capture').innerHTML = '0.0' + 'dB';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const ui = new UI();
    if(localStorage.getItem('inputs') === null) {
        return;
    } else {
        inputs = JSON.parse(localStorage.getItem('inputs'));
    }
    document.getElementById('input-power').value = inputs.inputPower;
    document.getElementById('gain').value = inputs.gain;
    document.getElementById('loss').value = inputs.loss;
    ui.calculateOutputPowerdBm(inputs);
})
document.getElementById('submit').addEventListener('click', function(e) {
    let inputPower = parseFloat(document.getElementById('input-power').value);
    let gain = parseFloat(document.getElementById('gain').value);
    let loss = parseFloat(document.getElementById('loss').value);
    const units = document.getElementById('units').value;
    const ui = new UI();
    const inputs = new Inputs(inputPower, gain, loss,);
    if(units !== 'dBm') {
        ui.convertToDbm(inputs);
    }
    ui.calculateOutputPowerdBm(inputs);
    e.preventDefault();
})
document.getElementById('form-inputs').addEventListener('click', function(e) {
    const ui = new UI();
    ui.resetValue(e.target);
    e.preventDefault();
})
document.getElementById('ac').addEventListener('click', function(e) {
    const ui = new UI();
    ui.clearInputs();
    e.preventDefault();
})
