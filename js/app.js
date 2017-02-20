var app = new Vue({
    el: '#profile',
    data: {
        user: {},
        repos: {},
        username: '',
        per_page: 5,
    },

    methods: {
        findUser() {
            axios.get('https://api.github.com/users/'+this.username, {
                params: {
                    client_id:'',
                    client_secret:'',

                }
            })
            .then(response => this.user = response.data);
            this.getRepos();
        },

        getRepos() {
            axios.get('https://api.github.com/users/'+this.username+'/repos', {
                params: {
                    client_id:'',
                    client_secret:'',
                    sort: 'created: asc',
                    per_page: this.per_page
                }
            })
            .then(response => this.repos = response.data);
        },

        getMoreRepos() {
            this.per_page = this.per_page + this.per_page;
            this.getRepos();
        },

        checkName() {
            // Check if the name entered is empty or not
            if(!this.username) {
                console.log('no name');
                this.per_page = 5;
            }
            else {
                this.findUser();
            }
        }
    }
}); 
