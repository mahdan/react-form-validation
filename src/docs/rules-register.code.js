
Rules.register('myCustomUsernameRule', function() {
    return {
        check: function check(value) {
            if (!/^[a-z0-9]+$/.test(value)) {
                return 'letters';
            }
            if (!value || value.length < 5) {
                return 'length';
            }
            if (!/[0-9]+$/.test(value)) {
                return 'syntax';
            }
            return true;
        },
        messages: {
            letters: 'Username should only contain lower case characters or numbers',
            length: 'Username should be at least 5 characters',
            syntax: 'Username should end with numbers'
        }
    };
});