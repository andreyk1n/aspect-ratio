// ;(function () {
//     var selectors = {
//         crops: 'input[name=crop]',
//         crop: 'input[name=crop]:checked'
//     };
    
//     var lastTarget;

//     // Перевіряє, чи ввімкнено округлення значень
//     function isRounded() {
//         return $('input[name=round]:checked').length === 1;
//     }

//     // Скидає значення форми до початкових
//     function resetForm() {
//         lastTarget = undefined;
//         $('#arc input[name=x1]').val(1024);
//         $('#arc input[name=y1]').val(768);
//         $('#arc input[name=x2]').val('');
//         $('#arc input[name=y2]').val('');
//         handleKeyup({});
//     }

//     // Перевіряє, чи введене значення є цілим числом
//     function isInteger(value) {
//         return /^[0-9]+$/.test(value);
//     }

//     // Спрощує пропорцію чисел до найменшого спільного дільника
//     function reduceRatio(numerator, denominator) {
//         function gcd(a, b) { 
//             return b === 0 ? a : gcd(b, a % b);
//         }

//         if (!isInteger(numerator) || !isInteger(denominator)) return '? : ?';
//         if (numerator === denominator) return '1 : 1';
        
//         let temp;
//         if (+numerator < +denominator) {
//             temp = numerator;
//             numerator = denominator;
//             denominator = temp;
//         }

//         let divisor = gcd(+numerator, +denominator);
//         return temp === undefined 
//             ? (numerator / divisor) + ' : ' + (denominator / divisor) 
//             : (denominator / divisor) + ' : ' + (numerator / divisor);
//     }

//     // Генерує CSS-розміри для заданого співвідношення
//     function ratioToCSS(numerator, denominator) {
//         let width, height;
        
//         if (+numerator > +denominator) {
//             width = 200;
//             height = calculateSize(width, undefined, numerator, denominator);
//         } else {
//             height = 200;
//             width = calculateSize(undefined, height, numerator, denominator);
//         }

//         return {
//             width: width + 'px',
//             height: height + 'px',
//             lineHeight: height + 'px'
//         };
//     }

//     // Обчислює одне з пропущених значень у пропорції
//     function calculateSize(width, height, numerator, denominator) {
//         if (width !== undefined) {
//             return isRounded() ? Math.round(width / (numerator / denominator)) : width / (numerator / denominator);
//         } else if (height !== undefined) {
//             return isRounded() ? Math.round(height * (numerator / denominator)) : height * (numerator / denominator);
//         }
//     }

//     // Обробник події введення у форму
//     function handleKeyup(evt) {
//         lastTarget = evt.target;

//         let x1 = $('#arc input[name=x1]');
//         let y1 = $('#arc input[name=y1]');
//         let x2 = $('#arc input[name=x2]');
//         let y2 = $('#arc input[name=y2]');

//         let x1v = x1.val();
//         let y1v = y1.val();
//         let x2v = x2.val();
//         let y2v = y2.val();

//         $('#ratio').html(reduceRatio(x1v, y1v));
//         $('#visual-ratio').css(ratioToCSS(x1v, y1v));
//         resizeSample();

//         if (!isInteger(x1v) || !isInteger(y1v)) return;

//         switch (evt.target) {
//             case x1[0]: x2.val(calculateSize(undefined, y2v, x1v, y1v)); break;
//             case y1[0]: y2.val(calculateSize(x2v, undefined, x1v, y1v)); break;
//             case x2[0]: y2.val(calculateSize(x2v, undefined, x1v, y1v)); break;
//             case y2[0]: x2.val(calculateSize(undefined, y2v, x1v, y1v)); break;
//         }
//     }

//     // Додаємо обробники подій
//     $('#arc input').keyup(handleKeyup);
//     $('input[name=round]').click(() => handleKeyup({ target: lastTarget }));
//     $('a.reset').click(evt => { evt.preventDefault(); resetForm(); });

//     // Функції для роботи з прикладом зображення
//     function hideSample() {
//         $('#visual-ratio').html('Example').css({ backgroundImage: 'none' });
//     }
    
//     function showSample() {
//         let img = $('<img>').attr('src', $('input[name=sample-url]').val());
//         img.on('load', resizeSample);
//         $('#visual-ratio').html('').append(img);
//     }

//     function resizeSample() {
//         let img = $('#visual-ratio img');
//         if (!img.length) return;
        
//         let boxRatio = $('#visual-ratio').width() / $('#visual-ratio').height();
//         let imgRatio = img.width() / img.height();
        
//         if ($(selectors.crop).val() === 'crop') {
//             imgRatio > boxRatio ? img.css({ width: 'auto', height: '100%' }) : img.css({ width: '100%', height: 'auto' });
//         } else {
//             imgRatio > boxRatio ? img.css({ width: '100%', height: 'auto' }) : img.css({ width: 'auto', height: '100%' });
//         }
//     }

//     $('input[name=sample-display]').click(function () {
//         this.checked ? ($('#croptions').show(), showSample()) : ($('#croptions').hide(), hideSample());
//     });
    
//     $(selectors.crops).click(resizeSample);
//     $('input[name=sample-url]').keyup(() => { hideSample(); showSample(); });
    
//     handleKeyup({});
// })();


;(function () {
    var selectors = {
        crops: '.aspect-calculator__crop-options input[name=crop]',
        crop: '.aspect-calculator__crop-options input[name=crop]:checked'
    };
    
    var lastTarget;

    // Перевіряє, чи ввімкнено округлення значень
    function isRounded() {
        return $('.aspect-calculator__checkbox[name=round]:checked').length === 1;
    }

    // Скидає значення форми до початкових
    function resetForm() {
        lastTarget = undefined;
        $('.aspect-calculator__input[name=x1]').val(1024);
        $('.aspect-calculator__input[name=y1]').val(768);
        $('.aspect-calculator__input[name=x2]').val('');
        $('.aspect-calculator__input[name=y2]').val('');
        handleKeyup({});
    }

    // Перевіряє, чи введене значення є цілим числом
    function isInteger(value) {
        return /^[0-9]+$/.test(value);
    }

    // Спрощує пропорцію чисел до найменшого спільного дільника
    function reduceRatio(numerator, denominator) {
        function gcd(a, b) { 
            return b === 0 ? a : gcd(b, a % b);
        }

        if (!isInteger(numerator) || !isInteger(denominator)) return '? : ?';
        if (numerator === denominator) return '1 : 1';
        
        let temp;
        if (+numerator < +denominator) {
            temp = numerator;
            numerator = denominator;
            denominator = temp;
        }

        let divisor = gcd(+numerator, +denominator);
        return temp === undefined 
            ? (numerator / divisor) + ' : ' + (denominator / divisor) 
            : (denominator / divisor) + ' : ' + (numerator / divisor);
    }

    // Генерує CSS-розміри для заданого співвідношення
    function ratioToCSS(numerator, denominator) {
        let width, height;
        
        if (+numerator > +denominator) {
            width = 200;
            height = calculateSize(width, undefined, numerator, denominator);
        } else {
            height = 200;
            width = calculateSize(undefined, height, numerator, denominator);
        }

        return {
            width: width + 'px',
            height: height + 'px',
            lineHeight: height + 'px'
        };
    }

    // Обчислює одне з пропущених значень у пропорції
    function calculateSize(width, height, numerator, denominator) {
        if (width !== undefined) {
            return isRounded() ? Math.round(width / (numerator / denominator)) : width / (numerator / denominator);
        } else if (height !== undefined) {
            return isRounded() ? Math.round(height * (numerator / denominator)) : height * (numerator / denominator);
        }
    }

    // Обробник події введення у форму
    function handleKeyup(evt) {
        lastTarget = evt.target;

        let x1 = $('.aspect-calculator__input[name=x1]');
        let y1 = $('.aspect-calculator__input[name=y1]');
        let x2 = $('.aspect-calculator__input[name=x2]');
        let y2 = $('.aspect-calculator__input[name=y2]');

        let x1v = x1.val();
        let y1v = y1.val();
        let x2v = x2.val();
        let y2v = y2.val();

        $('.aspect-calculator__ratio').html(reduceRatio(x1v, y1v));
        $('.aspect-calculator__visual-ratio').css(ratioToCSS(x1v, y1v));
        resizeSample();

        if (!isInteger(x1v) || !isInteger(y1v)) return;

        switch (evt.target) {
            case x1[0]: x2.val(calculateSize(undefined, y2v, x1v, y1v)); break;
            case y1[0]: y2.val(calculateSize(x2v, undefined, x1v, y1v)); break;
            case x2[0]: y2.val(calculateSize(x2v, undefined, x1v, y1v)); break;
            case y2[0]: x2.val(calculateSize(undefined, y2v, x1v, y1v)); break;
        }
    }

    // Додаємо обробники подій
    $('.aspect-calculator__input').keyup(handleKeyup);
    $('.aspect-calculator__checkbox[name=round]').click(() => handleKeyup({ target: lastTarget }));
    $('.aspect-calculator__reset-link').click(evt => { evt.preventDefault(); resetForm(); });

    // Функції для роботи з прикладом зображення
    function hideSample() {
        $('.aspect-calculator__visual-ratio').html('Example').css({ backgroundImage: 'none' });
    }
    
    function showSample() {
        let img = $('<img>').attr('src', $('.aspect-calculator__input[name=sample-url]').val());
        img.on('load', resizeSample);
        $('.aspect-calculator__visual-ratio').html('').append(img);
    }

    function resizeSample() {
        let img = $('.aspect-calculator__visual-ratio img');
        if (!img.length) return;
        
        let boxRatio = $('.aspect-calculator__visual-ratio').width() / $('.aspect-calculator__visual-ratio').height();
        let imgRatio = img.width() / img.height();
        
        if ($(selectors.crop).val() === 'crop') {
            imgRatio > boxRatio ? img.css({ width: 'auto', height: '100%' }) : img.css({ width: '100%', height: 'auto' });
        } else {
            imgRatio > boxRatio ? img.css({ width: '100%', height: 'auto' }) : img.css({ width: 'auto', height: '100%' });
        }
    }

    $('.aspect-calculator__checkbox[name=sample-display]').click(function () {
        this.checked ? ($('.aspect-calculator__crop-options').show(), showSample()) : ($('.aspect-calculator__crop-options').hide(), hideSample());
    });
    
    $(selectors.crops).click(resizeSample);
    $('.aspect-calculator__input[name=sample-url]').keyup(() => { hideSample(); showSample(); });
    
    handleKeyup({});
})();
