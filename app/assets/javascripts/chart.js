d3.custom = {};

d3.custom.barChart = function module() {
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 600,
        height = 900,
        gap = 0,
        ease = 'cubic-in-out';
    var svg, duration = 500;

    var dispatch = d3.dispatch('customHover');
    function exports(_selection) {
        _selection.each(function(_data) {

            var chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom;
            console.log(chartH);
            console.log(chartW);

            var x1 = d3.scale.ordinal()
                .domain(_data.map(function(d, i){ return i; }))
                .rangeRoundBands([0, chartW], .1);

            var x2 = d3.scale.ordinal()
                .domain(["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"])
                .rangeRoundBands([0, chartW], .1);

            var y1 = d3.scale.linear()
                .domain([d3.min(_data, function(d, i){ return d < 0 ? d : 0; }), d3.max(_data, function(d, i){ return d < 0 ? 0 : d; })])
                .range([chartH, 0]);

            var xAxis = d3.svg.axis()
                .scale(x2)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y1)
                .orient('left');

            var barW = chartW / _data.length;

            if(!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('chart-group', true);
                container.append('g').classed('x-axis-group axis', true);
                container.append('g').classed('y-axis-group axis', true);
            }

            svg.transition().duration(duration).attr({width: width, height: height})
            svg.select('.container-group')
                .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

            svg.select('.x-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .attr({transform: 'translate(0,' + y1(0) + ')'})
                .call(xAxis);

            svg.select('.y-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .call(yAxis);

            // svg.append("g")
            //   .attr("class", "x axis")
            //   .append("line")
            //   .attr("y1", y1(0))
            //   .attr("y2", y1(0))
            //   .attr("x2", width);


            var gapSize = x1.rangeBand() / 100 * gap;
            var barW = x1.rangeBand() - gapSize;
            var bars = svg.select('.chart-group')
                .selectAll('.bar')
                .data(_data);
            bars.enter().append('rect')
                .classed('bar', true)
                .attr({x: chartW,
                    width: barW,
                    y: function(d, i) { return y1(d); },
                    height: function(d, i) { return Math.abs(y1(d) - y1(0)); }
                })
                .on('mouseover', dispatch.customHover);
            bars.transition()
                .duration(duration)
                .ease(ease)
                .attr("class", function(d) { return d < 0 ? "bar negative" : "bar positive"; })
                .attr({
                    width: barW,
                    x: function(d, i) { return x1(i) + gapSize/2; },
                    y: function(d) { if (d > 0){
                        return y1(d);
                        } else {
                        return y1(0);
                        }
                     },
                    height: function(d) { return Math.abs(y1(d) - y1(0)); }
                });
            bars.exit().transition().style({opacity: 0}).remove();

            duration = 500;

        });
    }
    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = parseInt(_x);
        return this;
    };
    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = parseInt(_x);
        duration = 0;
        return this;
    };
    exports.gap = function(_x) {
        if (!arguments.length) return gap;
        gap = _x;
        return this;
    };
    exports.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};
