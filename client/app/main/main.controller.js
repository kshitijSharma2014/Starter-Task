'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.customers = [];
      this.customer = {};
      this.popup = {
        opened: false
      };
      this.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(1990, 5, 22),
        startingDay: 1
      };
      this.data = [];
      this.chartOptions = {
        chart: {
          type: 'pieChart',
          height: 500,
          x: function(d){return d[0];},
          y: function(d){return d[1];},
          showLabels: true,
          duration: 500,
          labelThreshold: 0.01,
          labelSunbeamLayout: true,
          legend: {
            margin: {
              top: 5,
              right: 35,
              bottom: 5,
              left: 0
            }
          }
        }
      };
    }

    $onInit() {
      this.$http.get('/api/customers')
        .then(response => {
          this.customers = response.data;
          this.data = _.toPairs(_.countBy(this.customers, 'type'));
        });
    }

    addCustomer() {
      if (this.customer.name!="" && this.customer.type!="" && this.customer.price!="" && this.customer.date!="") {
        const self = this;
        this.$http.post('/api/customers', this.customer).success((data) => {
          self.customers.push(data);
          self.customer = {};
          this.data = _.toPairs(_.countBy(this.customers, 'type'));
        });
      }
    }

    deleteCustomers(customer) {
      const self = this;
      this.$http.delete(`/api/customers/${customer._id}`).success(() => {
        _.remove(self.customers, (o) => o._id === customer._id);
        this.data = _.toPairs(_.countBy(this.customers, 'type'));
      });
    }

    open() {
      this.popup.opened = true;
    }
  }

  angular.module('dekorateApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();

