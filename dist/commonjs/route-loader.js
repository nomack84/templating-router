'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaRouter = require('aurelia-router');

var _aureliaPath = require('aurelia-path');

var _aureliaMetadata = require('aurelia-metadata');

var TemplatingRouteLoader = (function (_RouteLoader) {
  function TemplatingRouteLoader(compositionEngine) {
    _classCallCheck(this, _TemplatingRouteLoader);

    _RouteLoader.call(this);
    this.compositionEngine = compositionEngine;
  }

  _inherits(TemplatingRouteLoader, _RouteLoader);

  var _TemplatingRouteLoader = TemplatingRouteLoader;

  _TemplatingRouteLoader.prototype.loadRoute = function loadRoute(router, config) {
    var childContainer = router.container.createChild(),
        instruction = {
      viewModel: (0, _aureliaPath.relativeToFile)(config.moduleId, _aureliaMetadata.Origin.get(router.container.viewModel.constructor).moduleId),
      childContainer: childContainer,
      view: config.view || config.viewStrategy
    };

    childContainer.getChildRouter = function () {
      var childRouter;

      childContainer.registerHandler(_aureliaRouter.Router, function (c) {
        return childRouter || (childRouter = router.createChild(childContainer));
      });

      return childContainer.get(_aureliaRouter.Router);
    };

    return this.compositionEngine.createViewModel(instruction).then(function (instruction) {
      instruction.executionContext = instruction.viewModel;
      instruction.router = router;
      return instruction;
    });
  };

  TemplatingRouteLoader = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.CompositionEngine)(TemplatingRouteLoader) || TemplatingRouteLoader;
  return TemplatingRouteLoader;
})(_aureliaRouter.RouteLoader);

exports.TemplatingRouteLoader = TemplatingRouteLoader;