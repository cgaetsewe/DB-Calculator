class Inputs {
    constructor(inputPower, gainLoss) {
        this.inputPower = inputPower;
        this.gainLoss = gainLoss;
    }
}
class UI {
    calculateOutputPowerdBm(inputs) {
        const outputPowerinDbm = inputs.inputPower + inputs.gainLoss;
        document.getElementById('dBm').innerHTML = outputPowerinDbm.toFixed(1) + 'dBm';
        document.getElementById('input-capture').innerHTML = inputs.inputPower.toFixed(1) + 'dBm';
        document.getElementById('gain-capture').innerHTML = inputs.gainLoss.toFixed(1) + 'dB';
        const ui = new UI();
        ui.convertDbmToW(outputPowerinDbm);
        ui.convertDbmToDbW(outputPowerinDbm);
    }
    convertToDbm = function(inputs) {
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
    }
    convertDbmToW(outputPowerinDbm) {
        let outputPowerinW = 0.001 * Math.pow(10, (outputPowerinDbm/10));
        switch(true) {
            case outputPowerinDbm > 120:
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
        const ui = new UI();
        if(target.className === "clr") {
            target.parentElement.firstChild.value = 0;
            document.getElementById('form').mySubmit.click();
        }
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
document.getElementById('form').addEventListener('submit', function(e) {
    let inputPower = parseFloat(document.getElementById('input-power').value);
    let gainLoss = parseFloat(document.getElementById('gain-loss').value);
    const inputPower_units = document.getElementById('units').value;
    const ui = new UI();
    const inputs = new Inputs(inputPower, gainLoss);
    
    if(inputPower_units !== 'dBm') {
        ui.convertToDbm(inputs);
    }
    ui.calculateOutputPowerdBm(inputs);
    e.preventDefault();
});
document.getElementById('form-inputs').addEventListener('click', function(e) {
    const ui = new UI();
    ui.resetValue(e.target);
    e.preventDefault();
})










