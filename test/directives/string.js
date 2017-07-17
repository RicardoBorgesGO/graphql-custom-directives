import {
    GraphQLLowerCaseDirective,
    GraphQLUpperCaseDirective,
    GraphQLTemplateDirective,
    GraphQLToLowerDirective,
    GraphQLTrimDirective,
    GraphQLToUpperDirective,
    GraphQLYesNoDirective,
    GraphQLDecodeDirective,
    GraphQLDefaultToDirective
} from '../../src/index'

import { testEqual } from '../utils';

import { expect } from 'chai';

describe('directives/string/lowerCase', () => {

    it('expected to have name property', () => {
        expect(GraphQLLowerCaseDirective.name).to.a('string')
    });

    it('expected to have description property', () => {
        expect(GraphQLLowerCaseDirective.description).to.a('string')
    });

    it('expected to have args properties', () => {
        expect(GraphQLLowerCaseDirective.args).to.a('array')
    });

    it('expected to have locations list', () => {
        expect(GraphQLLowerCaseDirective.locations).to.a('array');
    });

    it('expected to have resolve function', () => {
        expect(GraphQLLowerCaseDirective.resolve).to.be.function;
    });

    it('expected regular execution of graphql', (done) => {
        const query = `{ value }`,
            directives = [],
            expected = { value: null };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result lower cased string', (done) => {
        const query = `{ value(input: "AAA") @lowerCase }`,
            directives = [GraphQLLowerCaseDirective],
            expected = { value: "aaa" };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result empty string', (done) => {
        const query = `{ value @lowerCase }`,
            directives = [GraphQLLowerCaseDirective],
            expected = { value: "" };

        testEqual({ directives, query, expected, done });
    });

});

describe('directives/string/upperCase', () => {

    it('expected to have name property', () => {
        expect(GraphQLUpperCaseDirective.name).to.a('string')
    });

    it('expected to have description property', () => {
        expect(GraphQLUpperCaseDirective.description).to.a('string')
    });

    it('expected to have args properties', () => {
        expect(GraphQLUpperCaseDirective.args).to.a('array')
    });

    it('expected to have locations list', () => {
        expect(GraphQLUpperCaseDirective.locations).to.a('array');
    });

    it('expected to have resolve function', () => {
        expect(GraphQLUpperCaseDirective.resolve).to.be.function;
    });

    it('expected regular execution of graphql', (done) => {
        const query = `{ value }`,
            directives = [],
            expected = { value: null };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result upper cased string', (done) => {
        const query = `{ value(input: "aaa") @upperCase }`,
            directives = [GraphQLUpperCaseDirective],
            expected = { value: "AAA" };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result empty string', (done) => {
        const query = `{ value @upperCase }`,
            directives = [GraphQLUpperCaseDirective],
            expected = { value: "" };

        testEqual({ directives, query, expected, done });
    });

});

describe('directives/string/template', () => {

    it('expected to have name property', () => {
        expect(GraphQLTemplateDirective.name).to.a('string')
    });

    it('expected to have description property', () => {
        expect(GraphQLTemplateDirective.description).to.a('string')
    });

    it('expected to have args properties', () => {
        expect(GraphQLTemplateDirective.args).to.a('array')
    });

    it('expected to have locations list', () => {
        expect(GraphQLTemplateDirective.locations).to.a('array');
    });

    it('expected to have resolve function', () => {
        expect(GraphQLTemplateDirective.resolve).to.be.function;
    });

    it('expected regular execution of graphql', (done) => {
        const query = `{ value }`,
            directives = [],
            expected = { value: null };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result a template\'s output', (done) => {
        const query = '{ value(input: "AAA") @template(as:"${input} - ${toLower(input)} ${test}") }',
            directives = [GraphQLTemplateDirective],
            expected = { value: "AAA - aaa " };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result a template\'s output', (done) => {
        const query = '{ value(input: "AAA") @template(as:"${input} - ${toLower(input)} ${test}") }',
            directives = [GraphQLTemplateDirective],
            expected = { value: "AAA - aaa " };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result a defaultTo\'s output', (done) => {
        const query = `{ root @default(to:"N/A") { input, output } }`,
            schema = `type Query { root: Root } type Root { input: String, output: String } schema {  query: Query }`,
            directives = [GraphQLDefaultToDirective],
            input = { root: { input: null, output: null } },
            expected = { root: { input: 'N/A', output: 'N/A' } };

        testEqual({ directives, query, expected, input, done, schema });
    });

    it('expected directive to alter execution of graphql and result a template\'s and pipeline of directives', (done) => {
        const query = '{ value(input:"AAA") @template(as:"${input} - ${toLower(input)} ${test}") @toLower @trim @toUpper @default(to:"N/A") }',
            expected = { value: 'AAA - AAA' },
            directives = [GraphQLTemplateDirective, GraphQLToLowerDirective, GraphQLTrimDirective, GraphQLToUpperDirective, GraphQLDefaultToDirective];

        testEqual({ directives, query, expected, done });
    });

});

describe('directives/string/yesNo', () => {

    it('expected to have name property', () => {
        expect(GraphQLYesNoDirective.name).to.a('string')
    });

    it('expected to have description property', () => {
        expect(GraphQLYesNoDirective.description).to.a('string')
    });

    it('expected to have args properties', () => {
        expect(GraphQLYesNoDirective.args).to.a('array')
    });

    it('expected to have locations list', () => {
        expect(GraphQLYesNoDirective.locations).to.a('array');
    });

    it('expected to have resolve function', () => {
        expect(GraphQLYesNoDirective.resolve).to.be.function;
    });

    it('expected regular execution of graphql', (done) => {
        const query = `{ value }`,
            directives = [],
            expected = { value: null };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result Yes/No - true description', (done) => {
        const query = `{ value(input: "true") @yesNo }`,
            directives = [GraphQLYesNoDirective],
            expected = { value: "sim" };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result Yes/No - true description', (done) => {
        const query = `{ value(input: "1") @yesNo }`,
            directives = [GraphQLYesNoDirective],
            expected = { value: "sim" };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result Yes/No - false description', (done) => {
        const query = `{ value(input: "0") @yesNo }`,
            directives = [GraphQLYesNoDirective],
            expected = { value: "não" };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result Yes/No - false description', (done) => {
        const query = `{ value(input: "false") @yesNo }`,
            directives = [GraphQLYesNoDirective],
            expected = { value: "não" };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result Yes/No - null description', (done) => {
        const query = `{ value(input: "null") @yesNo }`,
            directives = [GraphQLYesNoDirective],
            expected = { value: "" };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result empty string', (done) => {
        const query = `{ value @yesNo }`,
            directives = [GraphQLYesNoDirective],
            expected = { value: "" };

        testEqual({ directives, query, expected, done });
    });

});


describe('directives/string/decode', () => {

    it('expected to have name property', () => {
        expect(GraphQLDecodeDirective.name).to.a('string')
    });

    it('expected to have description property', () => {
        expect(GraphQLDecodeDirective.description).to.a('string')
    });

    it('expected to have args properties', () => {
        expect(GraphQLDecodeDirective.args).to.a('array')
    });

    it('expected to have locations list', () => {
        expect(GraphQLDecodeDirective.locations).to.a('array');
    });

    it('expected to have resolve function', () => {
        expect(GraphQLDecodeDirective.resolve).to.be.function;
    });

    it('expected regular execution of graphql', (done) => {
        const query = `{ value }`,
            directives = [],
            expected = { value: null };

        testEqual({ directives, query, expected, done });
    });

    it('expected directive to alter execution of graphql and result decode description', (done) => {
        const query = `{ value(input: "1") @decode(as:"0-não,1-sim") }`,
            directives = [GraphQLDecodeDirective],
            expected = { value: "sim" };

        testEqual({ directives, query, expected, done });
    });

});

