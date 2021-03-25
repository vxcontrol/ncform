## [1.10.0](https://github.com/ncform/ncform/compare/v1.9.2...v1.10.0) (2021-03-25)

### Bug Fixes

* **ncform-theme-elementui:** fixed when tab name is too long ([7eda795](https://github.com/vxcontrol/ncform/commit/7eda795e0eb0e88d27a06609b41dd5c8b3e2fbc3))
* **input:** fixes base ncform input _processModelVal with type number or integer and 0 value. ([81f5d51](https://github.com/vxcontrol/ncform/commit/81f5d5105080af1454354711ecce1f5a7dab6064))
* **ncform:** wrong code ([ccdfc96](https://github.com/vxcontrol/ncform/commit/ccdfc96db485d2eaa6d91d260880c780d3cdda1b))

### Features

* **ncform-show:** add ext components demo ([c0478ef](https://github.com/vxcontrol/ncform/commit/c0478ef06bec5ebdf40f2d74517d4eb0b90ce6d8))
* **ncform-theme-elementui:** array-tabs support draggable switch array position ([b52330e](https://github.com/vxcontrol/ncform/commit/b52330ed9cbcf661ea702543888a67e65e1f8697))
* **playground:** added nc-array-import demo ([759efe6](https://github.com/vxcontrol/ncform/commit/759efe694641c405dc2f040e0755e3a935a9706b))
* **ncform:** Add $ncformGetValue api ([0842c5c](https://github.com/vxcontrol/ncform/commit/0842c5c0ca597e630dd173d99e2a9f2e519ee67a)), closes [#55](https://github.com/ncform/ncform/issues/55)
* **ncform:** change $ncformGetValue api params; rm globalConfig.ignoreFieldValueWhenHidden config ([42493a4](https://github.com/vxcontrol/ncform/commit/42493a41092778b0cc43347e426bdf448b7cc477)), closes [#55](https://github.com/ncform/ncform/issues/55)
* **ncform-theme-elementui:** add title attribute to label ([9c6ea48](https://github.com/vxcontrol/ncform/commit/9c6ea4898c3a0b033b91ee9682248449530abf2f))


# [1.9.2](https://github.com/vxcontrol/ncform/compare/v1.8.0...v1.9.2) (2021-03-25)

### Bug Fixes

* fixed of emitting change event ([c634b87](https://github.com/vxcontrol/ncform/commit/c634b87e9f35c0fc99f783c1452f0587ccd47f2f))

# [1.8.0](https://github.com/vxcontrol/ncform/compare/v1.7.8...v1.8.0) (2020-10-28)

### Features

* added combining objects in json schema via allOf keys ([5b8a655](https://github.com/vxcontrol/ncform/commit/5b8a655551c4aa8c8da801d89379ce6d91b396b9))
* added selfPath and $path variables to describe chain path into dx expressions to current object of schema. this is the breaking change to use JS function signature in dx expressions ([769d988](https://github.com/vxcontrol/ncform/commit/769d988937e2940af2e37b70bff82b1d3a506687))
* changed default behaviour of adding new item into array, this will be always opened ([5bf27b3](https://github.com/vxcontrol/ncform/commit/5bf27b389061edb4c7917e5f47725f9ecc2bdc96))
* added using of objects for 'select' ui element ([2b80c4f](https://github.com/vxcontrol/ncform/commit/2b80c4f0573efbaa6935d4467952d68d8860c556))
* added dx expressions support to fieldPath of linked fields with the UI element ([6ab0bb0](https://github.com/vxcontrol/ncform/commit/6ab0bb0e31287046fcb4757eac3b98db5e910f8c))

## [1.7.8](https://github.com/vxcontrol/ncform/compare/v1.7.7...v1.7.8) (2020-10-23)

### Bug Fixes

* fixed of references loading sequence and added unit test case for describe reference in schema ([72eaaec](https://github.com/vxcontrol/ncform/commit/72eaaecc289fc5efd69c77e3082ae0cbbf5f4fff))
* fixed error array paths value got by changed ([df1cd23](https://github.com/vxcontrol/ncform/commit/df1cd23f150a35c5f331a9a7d19d75dcbf9aa20c)), closes [#162](https://github.com/ncform/ncform/issues/162)
* fixed crach when number type items in array ([e5a5e59](https://github.com/vxcontrol/ncform/commit/e5a5e597c6c54989d33eeefd309d8a9bee47228c)), closes [#150](https://github.com/ncform/ncform/issues/150)

## [1.7.7](https://github.com/vxcontrol/ncform/compare/v1.7.6...v1.7.7) (2020-10-22)

### Features

* added resolving of reference for json schema ([5a23034](https://github.com/vxcontrol/ncform/commit/5a23034fd89e65b136365dd5af12475143d48c2a))

## [1.7.6](https://github.com/vxcontrol/ncform/compare/v1.7.5...v1.7.6) (2020-08-20)

### Features

* added grouping elements for select control ([e9b5734](https://github.com/vxcontrol/ncform/commit/e9b5734139cf582694d2e6925031fe477a1e666b))
* added showIdxLabel option to array and passing Idx field to dx expression for array label ([d340a50](https://github.com/vxcontrol/ncform/commit/d340a5003d387c911082d5a072d479d9b4337b6f))

## [1.7.5](https://github.com/vxcontrol/ncform/compare/v1.7.4...v1.7.5) (2020-07-31)

### Bug Fixes

* fixed tests ([7421aa7](https://github.com/vxcontrol/ncform/commit/7421aa7843b940e7c9949efaa7109fe75eb20a2c))

### Features

* extend supported options for "select" control ([90a1997](https://github.com/vxcontrol/ncform/commit/90a1997c0db050a9610fcdc609a1ee52c7d16512))

## [1.7.4](https://github.com/vxcontrol/ncform/compare/v1.7.3...v1.7.4) (2020-07-29)

### Bug Fixes

* linting of current version code ([038481c](https://github.com/vxcontrol/ncform/commit/038481cb25364e1bcb53357dd44978f898bc59f0))
* translated descriptions and tests title from chinese to english and fixed unit tests and webpack configs ([da96bd8](https://github.com/vxcontrol/ncform/commit/da96bd849704699a97e781e6334850b429bd44c8), [47d2079](https://github.com/vxcontrol/ncform/commit/47d2079b10dfa42f9353ceb7b098ad4cf3afd18d))
* fixed tests for Element UI theme with loading of minimized JS instead of regular version ([9c87a11](https://github.com/vxcontrol/ncform/commit/9c87a11447d55cbee4352d8b098bf37240f9b0b8))

### Features

* added russian language to base controls ([8bd0024](https://github.com/vxcontrol/ncform/commit/8bd0024f5ffe86aef84689f9fb93f28fb2005f1e))

## [1.7.3](https://github.com/vxcontrol/ncform/compare/v1.7.0...v1.7.3) (2020-07-28)

### Features

* transferred code from the project [F-loat/ncform](https://github.com/F-loat/ncform)
* changed base to vxcontrol

# [1.7.0](https://github.com/ncform/ncform/compare/v1.6.9...v1.7.0) (2020-05-01)

### Bug Fixes

* **array widgets:** Fixed bug that globalConst not work at object item in array ([9e37f3f](https://github.com/ncform/ncform/commit/9e37f3f6d23d7c1e9ce939a979e2d08b31c02aa3)), closes [#140](https://github.com/ncform/ncform/issues/140)
* **array-table:** Fixed warning for key binding ([ce38dce](https://github.com/ncform/ncform/commit/ce38dce7c51c630b41a0971e8c075861148c4d0c)), closes [#145](https://github.com/ncform/ncform/issues/145)

### Features

* **object layout:** columns config support dx expression ([5654c60](https://github.com/ncform/ncform/commit/5654c6076aeb9d649955ea795c4035f65fe96601)), closes [#133](https://github.com/ncform/ncform/issues/133)
* return itemOldValue on change event ([d229aa4](https://github.com/ncform/ncform/commit/d229aa4481f6b8516bcc43decf77e1aeb864e31b)), closes [#135](https://github.com/ncform/ncform/issues/135)

## [1.6.9](https://github.com/ncform/ncform/compare/v1.6.8...v1.6.9) (2019-11-29)

### Bug Fixes

* **ncform-common:** Fixed the bug that the promise type rule logic does not take effect when submiss ([694a4a5](https://github.com/ncform/ncform/commit/694a4a5148192be14b1ff5dc7353ec0c55297fb4))

## [1.6.8](https://github.com/ncform/ncform/compare/v1.6.7...v1.6.8) (2019-11-27)

### Bug Fixes

* Solve display problem of widgets in "h" layout ([b4a148d](https://github.com/ncform/ncform/commit/b4a148de168af36a7446f8158563560ac390904d))

### Features

* **ncform-theme-elementui:** Add size config for input/input-number/select/date-picker widgets ([781f031](https://github.com/ncform/ncform/commit/781f031eefba316474c6bf4997b83c44cc236566)), closes [#105](https://github.com/ncform/ncform/issues/105)

## [1.6.7](https://github.com/ncform/ncform/compare/v1.6.6...v1.6.7) (2019-11-22)

### Bug Fixes

* **ncform:** Fixed dx bug of 'a[i].b.c' situation ([6c674c2](https://github.com/ncform/ncform/commit/6c674c21e45d4daa71a25fe2556b19f44607c172))

<a name="1.6.6"></a>
## [1.6.6](https://github.com/ncform/ncform/compare/v1.6.5...v1.6.6) (2019-10-26)

### Bug Fixes

* **ncform-common:** correct the parameter of dx expression function ([5bd3fb8](https://github.com/ncform/ncform/commit/5bd3fb8))

### Features

* **input and textarea:** add updateOn config for iput and textarea ([289c27b](https://github.com/ncform/ncform/commit/289c27b))

<a name="1.6.5"></a>
## [1.6.5](https://github.com/ncform/ncform/compare/v1.6.4...v1.6.5) (2019-10-24)

### Bug Fixes

* When showOneIfEmpty is true, there has extra blank row when there has initial value. ([1a9a987](https://github.com/ncform/ncform/commit/1a9a987))


<a name="1.6.4"></a>
## [1.6.4](https://github.com/ncform/ncform/compare/v1.6.3...v1.6.4) (2019-10-24)


### Bug Fixes

* **ncform:** fixed valueTemplate bug ([da8ee5c](https://github.com/ncform/ncform/commit/da8ee5c)), closes [#106](https://github.com/ncform/ncform/issues/106)
* Fixed the bug that valueTemplate don't work for array widgets ([1eafcc2](https://github.com/ncform/ncform/commit/1eafcc2)), closes [#107](https://github.com/ncform/ncform/issues/107)


<a name="1.6.2"></a>
## [1.6.2](https://github.com/ncform/ncform/compare/v1.6.1...v1.6.2) (2019-10-16)

### Bug Fixes

* **array widgets:** fixed bug for delExceptionRows implementation ([f76fd87](https://github.com/ncform/ncform/commit/f76fd87))
* **array-table:** fixed the display problem of column width ([e8e079c](https://github.com/ncform/ncform/commit/e8e079c))
* **ncform:** make sure the scrolling action is after the DOM update ([c3c72d3](https://github.com/ncform/ncform/commit/c3c72d3))

<a name="1.6.1"></a>
## [1.6.1](https://github.com/ncform/ncform/compare/v1.6.0...v1.6.1) (2019-10-16)

### Features

* **ncform:** Add the globalConfig.scrollToFailField to support auto scroll to the first validation ([a78362f](https://github.com/ncform/ncform/commit/a78362f)), closes [#102](https://github.com/ncform/ncform/issues/102)

<a name="1.6.0"></a>
# [1.6.0](https://github.com/ncform/ncform/compare/v1.5.0...v1.6.0) (2019-10-16)

### Bug Fixes

* **ncform-theme-elementui:** fixed bug that dropdown options do not show any more with configure filterLocal=false ([498ef06](https://github.com/ncform/ncform/commit/498ef06)), closes [#98](https://github.com/ncform/ncform/issues/98)


### Features

* **array layout widgets:** add delExceptionRows config for all layout widgets ([49bdbbf](https://github.com/ncform/ncform/commit/49bdbbf)), closes [#100](https://github.com/ncform/ncform/issues/100)
* **array-table:** add column config (colgroup) for array-table widget ([aad46c4](https://github.com/ncform/ncform/commit/aad46c4)), closes [#99](https://github.com/ncform/ncform/issues/99)

<a name="1.5.0"></a>
# [1.5.0](https://github.com/ncform/ncform/compare/v1.4.0...v1.5.0) (2019-10-11)

### Features

* **ncform-theme-elementui:** add the switch widget to the standard components ([1180196](https://github.com/ncform/ncform/commit/1180196)), closes [#73](https://github.com/ncform/ncform/issues/73)
* **ncform-theme-elementui:** upload and input.upload add headers config ([16c0511](https://github.com/ncform/ncform/commit/16c0511)), closes [#93](https://github.com/ncform/ncform/issues/93)


<a name="1.4.0"></a>
# [1.4.0](https://github.com/ncform/ncform/compare/v1.3.2...v1.4.0) (2019-08-05)

### Features

* **ncform:** add item change event ([49a9617](https://github.com/ncform/ncform/commit/49a9617)), closes [#86](https://github.com/ncform/ncform/issues/86)
* **ncform-theme-elementui:** add compound.appendSelect.placeholder and compound.prependSelect.placeholder for input widget ([0ab6584](https://github.com/ncform/ncform/commit/0ab6584)), closes [#85](https://github.com/ncform/ncform/issues/85)
* Add showOneIfEmpty option for array / array-table / array-tabs widgets ([5255597](https://github.com/ncform/ncform/commit/5255597)), closes [#87](https://github.com/ncform/ncform/issues/87)

<a name="1.3.4"></a>
## [1.3.4](https://github.com/ncform/ncform/compare/v1.3.3...v1.3.4) (2019-07-24)

### Features

* **ncform:** add autoDX option to control whether widget configuration supports dx expression automatically or not ([62d23ee](https://github.com/ncform/ncform/commit/62d23ee))

<a name="1.3.3"></a>
## [1.3.3](https://github.com/ncform/ncform/compare/v1.3.2...v1.3.3) (2019-07-03)

### Bug Fixes

* **ncform-theme-elementui:** fixed: Invalid handler for event "change": got undefined ([373848f](https://github.com/ncform/ncform/commit/373848f))

<a name="1.3.2"></a>
## [1.3.2](https://github.com/ncform/ncform/compare/v1.3.1...v1.3.2) (2019-06-24)

### Features

* **ncform-theme-elementui:** add valueFormat config for date-picker widget ([7d38dc6](https://github.com/ncform/ncform/commit/7d38dc6)), closes [#68](https://github.com/ncform/ncform/issues/68)

<a name="1.3.1"></a>
## [1.3.1](https://github.com/ncform/ncform/compare/v1.3.0...v1.3.1) (2019-06-13)

### Bug Fixes

* **ncform-theme-elementui:** fixed itemDataKey get undefined value when enumSource be setted by dx express ([631b6c7](https://github.com/ncform/ncform/commit/631b6c7))

<a name="1.3.0"></a>
# [1.3.0](https://github.com/ncform/ncform/compare/v1.2.1...v1.3.0) (2019-06-13)

### Features

* select/radio/checkbox adds itemDataKey config ([1d7fba3](https://github.com/ncform/ncform/commit/1d7fba3))

<a name="1.2.1"></a>
## [1.2.1](https://github.com/ncform/ncform/compare/v1.2.0...v1.2.1) (2019-06-05)

### Bug Fixes

* **ncform-theme-elementui:** add inVLayout config to correct distance to label when in v layout ([fbcfcce](https://github.com/ncform/ncform/commit/fbcfcce)), closes [#69](https://github.com/ncform/ncform/issues/69)
* **ncform-theme-elementui:** auto active tab when adding and deleting ([5ce6e36](https://github.com/ncform/ncform/commit/5ce6e36)), closes [#71](https://github.com/ncform/ncform/issues/71)
* **ncform-theme-elementui:** fixed select enumSource not support dx expression bug ([cc5209b](https://github.com/ncform/ncform/commit/cc5209b))

<a name="1.2.0"></a>
## [1.2.0](https://github.com/ncform/ncform/compare/v1.1.2...v1.2.0) (2019-05-17)

### Bug Fixes

* fixed "TypeError: Cannot read property 'showLegend' of undefined" ([beead19](https://github.com/ncform/ncform/commit/beead19)), closes [#57](https://github.com/ncform/ncform/issues/57)

### Features

* **ncform:** add $ncformAllRules and $ncformAllWidgets apis ([c565992](https://github.com/ncform/ncform/commit/c565992))
* add requiredDelConfirm and delConfirmText configs for array type layouts ([886148b](https://github.com/ncform/ncform/commit/886148b)), closes [#62](https://github.com/ncform/ncform/issues/62)

<a name="1.1.2"></a>
## [1.1.2](https://github.com/ncform/ncform/compare/v1.1.1...v1.1.2) (2019-04-24)

### Bug Fixes

* **ncform-common:** Improve the format verification of the form schema ([395cdfb](https://github.com/ncform/ncform/commit/395cdfb))
* **ncform-theme-elementui:** fixed modelVal becomes '0' when the date-picker value is cleared ([c054a0a](https://github.com/ncform/ncform/commit/c054a0a)), closes [#56](https://github.com/ncform/ncform/issues/56)
* fixed the problem of displaying empty options when entering keyword with no matches and blur ([e175661](https://github.com/ncform/ncform/commit/e175661))

<a name="1.1.1"></a>
## [1.1.1](https://github.com/ncform/ncform/compare/v1.1.0...v1.1.1) (2019-03-30)

### Bug Fixes

* **ncform-theme-elementui:** fixed error when not provide otherParams ([66d1713](https://github.com/ncform/ncform/commit/66d1713))
* **ncform-theme-elementui:** fixed select widget bugs ([ea05422](https://github.com/ncform/ncform/commit/ea05422))

<a name="1.1.0"></a>
## [1.1.0](https://github.com/ncform/ncform/compare/v1.0.0...v1.1.0) (2019-03-30)

### Code Refactoring

* rename $t to $nclang, in order to avoid conflicts with vue-i18n method ([6df509e](https://github.com/ncform/ncform/commit/6df509e)), closes [#51](https://github.com/ncform/ncform/issues/51)

<a name="1.0.0"></a>
## [1.0.0](https://github.com/ncform/ncform/compare/v0.1.28...v1.0.0) (2019-03-19)

### Bug Fixes

* Fixed object layout cann't show label when setting v layout ([ff65ac1](https://github.com/ncform/ncform/commit/ff65ac1))
* **ncform:** fixed image width or height not adaptive when preview ([61bea74](https://github.com/ncform/ncform/commit/61bea74))
* **ncform:** fixed the bug that the valueTemplate initialization value is overwritten by the dynamically calculated value ([7a8ca09](https://github.com/ncform/ncform/commit/7a8ca09))

### Features

* All stardard widgets's widgetConfig support dx expression ([ae829e0](https://github.com/ncform/ncform/commit/ae829e0))
* ui.legend support dx expression ([45af266](https://github.com/ncform/ncform/commit/45af266))
* ui.label support dx expression ([cc0f585](https://github.com/ncform/ncform/commit/cc0f585))
* Fully tested

### BREAKING CHANGES

* All custom widgets's widgetConfig configuration properties automatically support dx expressions
* Widget's mergeConfig is readonly now. don't use it as data for assignment.

<a name="0.1.28"></a>
## [0.1.28](https://github.com/ncform/ncform/compare/v0.1.27...v0.1.28) (2019-03-04)

### Bug Fixes

Fixed init lang parameter default value bugs && array-table required flag display bugs([cc38c47](https://github.com/ncform/ncform/commit/cc38c47))

<a name="0.1.27"></a>
## [0.1.27](https://github.com/ncform/ncform/compare/v0.1.26...v0.1.27) (2019-03-03)

### Bug Fixes

* Add lang option when init ncform && remove `$ncformSetLang` api ([25d4684](https://github.com/ncform/ncform/commit/25d4684))

<a name="0.1.26"></a>
## [0.1.26](https://github.com/ncform/ncform/compare/v0.1.25...v0.1.26) (2019-03-03)

### Features

* Add `$ncformAddWidget` and `$ncformAddRule` apis ([3aba786](https://github.com/ncform/ncform/commit/3aba786))
* Add `$ncformSetLang` api && all standard components support en && zh-cn ([3ba93ff](https://github.com/ncform/ncform/commit/3ba93ff))


<a name="0.1.25"></a>
## [0.1.25](https://github.com/ncform/ncform/compare/v0.1.24...v0.1.25) (2019-02-26)


### Bug Fixes

* Fixed the display bug of the object type control in the h layout ([88aa77b](https://github.com/ncform/ncform/commit/88aa77b))
* Remove garbled chars ([db4e9ca](https://github.com/ncform/ncform/commit/db4e9ca))


### Features

* Add HTML && COMP types to support static content show. ([e4a9bc7](https://github.com/ncform/ncform/commit/e4a9bc7))
* Add array item collapse feature ([7ac74ad](https://github.com/ncform/ncform/commit/7ac74ad))

<a name="0.1.17"></a>
## [0.1.17](https://github.com/ncform/ncform/compare/v0.1.16...v0.1.17) (2018-10-29)


### Features

* **ncform:** add isDirty prop ([82a468b](https://github.com/ncform/ncform/commit/82a468b)), closes [#32](https://github.com/ncform/ncform/issues/32)

<a name="0.1.16"></a>
## [0.1.16](https://github.com/ncform/ncform/compare/v0.1.15...v0.1.16) (2018-10-27)


### Bug Fixes

* **ncform-theme-elementui:** fixed upload control fields assignment error ([23a4acf](https://github.com/ncform/ncform/commit/23a4acf)), closes [#23](https://github.com/ncform/ncform/issues/23)
* **ncform-theme-elementui:** fixed select control when multiple is set to true, then the otherParams changed cause error ([1485660](https://github.com/ncform/ncform/commit/1485660)), closes [#24](https://github.com/ncform/ncform/issues/24)


### Features

* **ncform:** add new rule - ajax ([961f1eb](https://github.com/ncform/ncform/commit/961f1eb)), closes [#29](https://github.com/ncform/ncform/issues/29)
* **ncform:** add reset method - $ncformReset(formName) ([a192afc](https://github.com/ncform/ncform/commit/a192afc)), closes [#25](https://github.com/ncform/ncform/issues/25)
* **ncform:** description support dx expression && html content ([7fc4532](https://github.com/ncform/ncform/commit/7fc4532)), closes [#27](https://github.com/ncform/ncform/issues/27)

<a name="0.1.15"></a>
## [0.1.15](https://github.com/ncform/ncform/compare/v0.1.14...v) (2018-10-11)

### Bug Fixes

* **ncform-theme-elementui:** fixed input control $emit input event when init with compound.prependSelect config ([941a88f](https://github.com/ncform/ncform/commit/941a88f)), closes [#19](https://github.com/ncform/ncform/issues/19)

### Features

* **ncform:** add valueTemplate config, now you can easily control one field's value depend on another ([8ac95eb](https://github.com/ncform/ncform/commit/8ac95eb))

<a name="0.1.13"></a>
## [0.1.13](https://github.com/ncform/ncform/compare/v0.1.12...v0.1.13) (2018-09-10)

### Bug Fixes

* **ncform:** fixed non-required fields still verify rules with empty value ([fe9901c](https://github.com/ncform/ncform/commit/fe9901c)), issue [#16](https://github.com/ncform/ncform/issues/16)

### Features

* **ncform:** add globalConfig.ignoreRulesWhenHidden configure ([4d0b6d0](https://github.com/ncform/ncform/commit/4d0b6d0)), issue [#17](https://github.com/ncform/ncform/issues/17)
* **ncform:** pattern rule value support string type ([cd22f48](https://github.com/ncform/ncform/commit/cd22f48)), issue [#15](https://github.com/ncform/ncform/issues/15)



<a name="0.1.12"></a>
## [0.1.12](https://github.com/ncform/ncform/compare/v0.1.10...v) (2018-08-24)

### Features

* **ncform:** default value support dx expression ([bee57fc](https://github.com/ncform/ncform/commit/bee57fc))

<a name="0.1.10"></a>
## [0.1.10](https://github.com/ncform/ncform/compare/v0.1.8...v0.1.10) (2018-08-07)

### Features

* Build `template compiled` lib to suppoort runtime-only version vue； ([98f46f5](https://github.com/ncform/ncform/commit/98f46f5))

* Upgrade webpack version to 4；([98f46f5](https://github.com/ncform/ncform/commit/98f46f5))

* **ncform-theme-element:** input control add trim configure; ([98f46f5](https://github.com/ncform/ncform/commit/98f46f5))


