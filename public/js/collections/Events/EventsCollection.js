define([
    "models/EventModel"
],
    function (EventModel) {
        var EventsCollection = Backbone.Collection.extend({
            model: EventModel,

            url: "/Events",

            initialize: function (options) {
                //if(options.fetch){
                var mid = 39;
                this.fetch({
                    data: {
                        mid: mid,
                        idArray: options ? options.idArray : null

                    },
                    reset: true,
                    success: this.fetchSuccess
                });
                //}
            },

            filterById: function (idArray) {
                //var events = [];
                var self = this;
                //_.each(idArray, function (item) {
                //    var filtered = self.filter(function (data) {
                //        return (data.get('calendarId')._id ? data.get('calendarId')._id == item : data.get('calendarId') == item);
                //        return data.get('calendarId')._id == item;
                //    });
                //    events = events.concat(filtered);
                //});
                this.fetch({
                    data: { idArray: idArray },
                    success: function() {
                        return self;
                    },
                    error: function() {
                        console.log('error');
                        return null;
                    }
                });
  
            },

            parse: true,

            parse: function (response) {
                $.each(response.data, function (index) {
                    if (response.data[index].hasOwnProperty('_id')) {
                        response.data[index]["id"] = response.data[index]["_id"];
                        //delete response.data[index]["_id"];
                    }
                });
                return response.data;
            },
            fetchSuccess: function () {
                console.log("Events fetchSuccess");
            }

        });

        return EventsCollection;
    });
