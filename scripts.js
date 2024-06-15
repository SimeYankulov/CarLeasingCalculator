document.addEventListener('DOMContentLoaded', () => {
    const carTypeSelect = document.getElementById('carType');
    const carValueInput = document.getElementById('carValue');
    const carValueRange = document.getElementById('carValueRange');
    const leasePeriodInput = document.getElementById('leasePeriod');
    const leasePeriodRange = document.getElementById('leasePeriodRange');
    const downPaymentInput = document.getElementById('downPayment');
    const downPaymentRange = document.getElementById('downPaymentRange');

    const totalCostDisplay = document.getElementById('totalCost');
    const downPaymentDisplay = document.getElementById('downPaymentDisplay');
    const monthlyInstallmentDisplay = document.getElementById('monthlyInstallment');
    const interestRateDisplay = document.getElementById('interestRate');


    updateLeaseDetails();

    carTypeSelect.addEventListener('change', () => {
        updateLeaseDetails();
    });

    // Sync range inputs and number inputs
    carValueInput.addEventListener('input', () => {
        validateCarValue();
        carValueRange.value = carValueInput.value;
        updateLeaseDetails();
    });
    carValueRange.addEventListener('input', () => {
        carValueInput.value = carValueRange.value;
        updateLeaseDetails();
    });
 
    leasePeriodInput.addEventListener('input', () => {
        validateLeasePeriod();
        leasePeriodRange.value = leasePeriodInput.value;
        updateLeaseDetails();
    });
    leasePeriodRange.addEventListener('input', () => {
        leasePeriodInput.value = leasePeriodRange.value;
        updateLeaseDetails();
    });

    downPaymentInput.addEventListener('input', () => {
        validateDownPayment();
        downPaymentRange.value = downPaymentInput.value;
        updateLeaseDetails();
    });
    downPaymentRange.addEventListener('input', () => {
        downPaymentInput.value = downPaymentRange.value;
        updateLeaseDetails();
    });

    function getInterestRate() {
        const carType = carTypeSelect.value;
        if (carType === 'new') {
            return 0.0299; 
        } else {
            return 0.037;
        }
    }

    function validateCarValue() {
        const minCarValue = 10000;
        const maxCarValue = 200000;
        let value = parseFloat(carValueInput.value);
        if (value < minCarValue) {
            carValueInput.value = minCarValue;
        } else if (value > maxCarValue) {
            carValueInput.value = maxCarValue;
        }
    }

    function validateLeasePeriod() {
        const minLeasePeriod = 12;
        const maxLeasePeriod = 60;
        let value = parseInt(leasePeriodInput.value);
        if (value < minLeasePeriod) {
            leasePeriodInput.value = minLeasePeriod;
        } else if (value > maxLeasePeriod) {
            leasePeriodInput.value = maxLeasePeriod;
        } else if (value % 12 !== 0) {
            leasePeriodInput.value = Math.round(value / 12) * 12;
        }
    }

    function validateDownPayment() {
        const minDownPayment = 10;
        const maxDownPayment = 50;
        let value = parseInt(downPaymentInput.value);
        if (value < minDownPayment) {
            downPaymentInput.value = minDownPayment;
        } else if (value > maxDownPayment) {
            downPaymentInput.value = maxDownPayment;
        } else if (value % 5 !== 0) {
            downPaymentInput.value = Math.round(value / 5) * 5;
        }
    }

    function updateLeaseDetails() {
        const carValue = parseFloat(carValueInput.value);
        const leasePeriod = parseInt(leasePeriodInput.value);
        const downPaymentPercent = parseInt(downPaymentInput.value);
        const interestRate = getInterestRate();

        const downPaymentAmount = carValue * (downPaymentPercent / 100);
        const loanAmount = carValue - downPaymentAmount;
        const monthlyInterestRate = interestRate / 12;
        const monthlyInstallment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod));
        const totalLeasingCost = downPaymentAmount + (monthlyInstallment * leasePeriod);

        totalCostDisplay.textContent = `€${totalLeasingCost.toFixed(2)}`;
        downPaymentDisplay.textContent = `€${downPaymentAmount.toFixed(2)}`;
        monthlyInstallmentDisplay.textContent = `€${monthlyInstallment.toFixed(2)}`;
        interestRateDisplay.textContent = `${(interestRate * 100).toFixed(2)}%`;
    }
});
