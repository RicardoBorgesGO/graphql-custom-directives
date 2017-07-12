'use strict';

var _graphql = require('graphql');

var _directives = require('graphql/type/directives');

var _custom = require('../custom');

var _lodash = require('lodash');

var moment = require('moment');

var DEFAULT_DATE_FORMAT = 'DD MMM YYYY HH:mm';

exports.GraphQLDateDirective = new _custom.GraphQLCustomDirective({
    name: 'date',
    description: 'Format the date from resolving the field by moment module',
    locations: [_directives.DirectiveLocation.FIELD],
    args: {
        as: {
            type: _graphql.GraphQLString,
            description: 'A format given by moment module'
        }
    },
    resolve: function resolve(_resolve2, source, _ref2) {
        var as = _ref2.as;

        return _resolve2().then(function (input) {

            var format = as || DEFAULT_DATE_FORMAT;

            if (format.indexOf('days') !== -1 || format.indexOf('ago') !== -1) {
                return moment.utc().diff(input, 'days') + ' ' + format;
            }

            if (('' + input).length === 13) {
                input = Number(input);
            }

            if (!Date.parse(input) && ('' + input).length !== 13) {
                return input;
            }

            return moment.utc(input).format(format);
        });
    }
});

exports.GraphQLTimeOffsetDirective = new _custom.GraphQLCustomDirective({
    name: 'timeOffset',
    description: 'Add offset (in minutes) to a 13 digit unixtime',
    locations: [_directives.DirectiveLocation.FIELD],
    args: {
        offsetLocation: {
            type: _graphql.GraphQLString,
            description: 'Path of offset in minutes within context object. e.g - "req.profile.utcOffset"'
        }
    },
    resolve: function resolve(_resolve, source, _ref, context, info) {
        var offsetMinutes = _lodash._.get(context, _ref.offsetLocation);
        var offsetMilliseconds = offsetMinutes * 60 * 1000;

        return _resolve().then(function (input) {

            if (('' + input).length === 13) {
                input = Number(input) + offsetMilliseconds;
                return input;
            }
        });
    }
});