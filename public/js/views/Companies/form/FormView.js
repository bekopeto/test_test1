/**
 * Created with JetBrains PhpStorm.
 * User: Ivan
 * Date: 03.12.13
 * Time: 8:43
 * To change this template use File | Settings | File Templates.
 */

define([
    'text!templates/Companies/list/ListTemplate.html',
    'text!templates/Companies/form/FormTemplate.html',
    'views/Companies/EditView'
],

    function (CompaniesListTemplate, CompaniesFormTemplate, EditView) {
        var FormCompaniesView = Backbone.View.extend({
            el: '#content-holder',
            initialize: function (options) {
                this.formModel = options.model;
            },

            render: function () {
                var formModel = this.formModel.toJSON();
                this.$el.html(_.template(CompaniesFormTemplate, formModel));
                return this;
            },
            
            editItem: function () {
                //create editView in dialog here
                new EditView({ model: this.formModel });
            },
            
            deleteItems: function () {
                var mid = 39;
                   
                this.formModel.destroy({
                    headers: {
                        mid: mid
                    },
                    success: function () {
                        Backbone.history.navigate("#easyErp/Companies/list", { trigger: true });
                    }
                });

            }
        });

        return FormCompaniesView;
    });