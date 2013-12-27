// MapFilter.FilterPane
// --------------------

// The FilterPane shows the list of filters that can be used to explore data.
// It creates a filter view for each filter in the array `options.filters`
// which should have the following properties:
// 
// - `field` is the field/attribute to filter by
// - `type` should be `discrete` for string data and `continuous` for numbers or dates
// - `expanded` sets whether the filter view is expanded or collapsed by default    
MapFilter.FilterPane = Backbone.View.extend({

    id: "filter-pane",

    initialize: function(options) {
        var filters = options.filters || [];

        // Initialize a graph pane to hold charts for continuous filters
        this.graphPane = new MapFilter.GraphPane({
            collection: this.collection
        });
        
        // Append the graph parent to this pane's parent
        this.$el.append(this.graphPane.render().el);

        this.$filters = $('<form class="form"/>').appendTo(this.el);

        // Loop through each filter and add a view to the pane
        filters.forEach(function(filter) {
            this.addFilter(filter);
        }, this);

    },

    // Add a filter on a field to the filter pane.
    addFilter: function(options) {
        var filterView;

        if (!options.field) {
            console.error(t("error.filter_missing"));
            return;
        }

        // Initialize a ContinuousFilterView or DiscreteFilterView
        // ContinousFilterView is linked to the GraphPane which will show
        // the bar chart for selecting ranges of data
        if (options.type === "continuous") {
            filterView = new MapFilter.ContinuousFilterView({
                collection: this.collection,
                field: options.field,
                expanded: options.expanded || false,
                graphPane: this.graphPane
            });
        } else {
            filterView = new MapFilter.DiscreteFilterView({
                collection: this.collection,
                field: options.field,
                expanded: options.expanded || false
            });
        }

        this.$filters.append(filterView.render().el);
    }
});