import assert from 'assert';
import _get from 'lodash-es/get';
import ncformUtils from '../../src/ncform-utils.js';

describe('/src/ncform-utils.js', () => {
  // --- perfectFormSchema

  it("perfectFormSchema - Data format check", () => {
    // not a valid json string
    let formSchema = "{a: 1}";
    assert.throws(
      ncformUtils.perfectFormSchema.bind(ncformUtils, formSchema),
      /fromSchema must be a valid json format/
    );

    // not array
    formSchema = [];
    assert.throws(
      ncformUtils.perfectFormSchema.bind(ncformUtils, formSchema),
      /fromSchema must be a json object/
    );

    // root node's type is not 'object'
    formSchema = {
      type: 'array'
    };
    assert.throws(
      ncformUtils.perfectFormSchema.bind(ncformUtils, formSchema),
      /fromSchema' root field type must be object/
    );
  });
  it("perfectFormSchema - Implicit widget and widgetConfig", () => {
    const formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        note: {},
        age: {
          type: 'integer'
        },
        grade: {
          type: 'number'
        },
        audit: {
          type: 'boolean'
        },
        hobbies: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    };
    const newFormSchema = ncformUtils.perfectFormSchema(formSchema);
    assert.equal(newFormSchema.ui.widget, 'object');
    assert.equal(newFormSchema.properties.hobbies.ui.widget, 'array');
    assert.equal(newFormSchema.properties.name.ui.widget, 'input');
    assert.equal(newFormSchema.properties.name.ui.widgetConfig.type, 'text');
    assert.equal(newFormSchema.properties.note.type, 'string');
    assert.equal(newFormSchema.properties.note.ui.widget, 'input');
    assert.equal(newFormSchema.properties.note.ui.widgetConfig.type, 'text');
    assert.equal(newFormSchema.properties.age.ui.widget, 'input');
    assert.equal(newFormSchema.properties.age.ui.widgetConfig.type, 'number');
    assert.equal(newFormSchema.properties.grade.ui.widget, 'input');
    assert.equal(newFormSchema.properties.grade.ui.widgetConfig.type, 'number');
    assert.equal(newFormSchema.properties.audit.ui.widget, 'radio');
  });
  it("perfectFormSchema - Other fields", () => {
    const formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        obj: {
          type: 'object'
        },
        arr: {
          type: 'array'
        },
        _link: {
          type: 'HTML'
        }
      }
    };
    const newFormSchema = ncformUtils.perfectFormSchema(formSchema);
    assert.equal(newFormSchema.ui.showLabel, true);
    assert.equal(newFormSchema.ui.showIdxLabel, false);
    assert.equal(newFormSchema.ui.showLegend, true);
    assert.equal(newFormSchema.ui.noLabelSpace, false);
    assert.deepEqual(newFormSchema.globalConfig, {
      style: {
        formCls: "",
        invalidFeedbackCls: ""
      },
      validationMsg: {},
      constants: {},
      status: "edit",
      updateWait: 1000,
      scrollToFailField: {
        // Automatically scroll to fields that failed validation
        enabled: true, // enable this feature or not
        container: 'body',
        duration: 500, // The duration (in milliseconds) of the scrolling animation
        offset: -80 // The offset that should be applied when scrolling.
      }
    });
    assert.equal(newFormSchema.properties.name.ui.label, 'name');
    assert.equal(newFormSchema.properties.name.ui.showLabel, true);
    assert.equal(newFormSchema.properties.name.ui.showIdxLabel, false);
    assert.equal(newFormSchema.properties.name.ui.noLabelSpace, false);
    assert.equal(newFormSchema.properties.obj.ui.label, 'obj');
    assert.equal(newFormSchema.properties.obj.ui.showLabel, true);
    assert.equal(newFormSchema.properties.obj.ui.showIdxLabel, false);
    assert.equal(newFormSchema.properties.obj.ui.showLegend, false);
    assert.equal(newFormSchema.properties.arr.ui.label, 'arr');
    assert.equal(newFormSchema.properties.arr.ui.showLabel, true);
    assert.equal(newFormSchema.properties.arr.ui.showIdxLabel, true);
    assert.equal(newFormSchema.properties.arr.ui.showLegend, false);
    assert.equal(newFormSchema.properties._link.ui.noLabelSpace, true);
  });
  it("perfectFormSchema - References in schema", () => {
    const formSchema = {
      type: 'object',
      definitions: {
        string: {
          ui: {
            label: 'my_name',
            noLabelSpace: true
          }
        },
        object: {
          type: 'object'
        },
        array: {
          type: 'array',
          value: [345, 456]
        }
      },
      properties: {
        name: {
          $ref: "#/definitions/string",
          type: 'string',
          ui: {
            showLabel: false
          }
        },
        obj: {
          $ref: "#/definitions/object"
        },
        arr: {
          $ref: "#/definitions/array",
          value: [123, 234, 345]
        }
      }
    };
    const newFormSchema = ncformUtils.perfectFormSchema(formSchema);
    assert.equal(newFormSchema.ui.showLabel, true);
    assert.equal(newFormSchema.ui.showIdxLabel, false);
    assert.equal(newFormSchema.ui.showLegend, true);
    assert.equal(newFormSchema.ui.noLabelSpace, false);
    assert.equal(newFormSchema.properties.name.ui.label, 'my_name');
    assert.equal(newFormSchema.properties.name.ui.showLabel, false);
    assert.equal(newFormSchema.properties.name.ui.showIdxLabel, false);
    assert.equal(newFormSchema.properties.name.ui.noLabelSpace, true);
    assert.equal(newFormSchema.properties.obj.ui.label, 'obj');
    assert.equal(newFormSchema.properties.obj.ui.showLabel, true);
    assert.equal(newFormSchema.properties.obj.ui.showIdxLabel, false);
    assert.equal(newFormSchema.properties.obj.ui.showLegend, false);
    assert.equal(newFormSchema.properties.arr.ui.label, 'arr');
    assert.equal(newFormSchema.properties.arr.ui.showLabel, true);
    assert.equal(newFormSchema.properties.arr.ui.showIdxLabel, true);
    assert.equal(newFormSchema.properties.arr.ui.showLegend, false);
    assert.deepEqual(newFormSchema.properties.arr.value, [123, 234, 345, 456]);
  });
  it("perfectFormSchema - Combining in schema (allOf)", () => {
    const formSchema = {
      type: 'object',
      properties: {
        name: {
          allOf: [{
            type: 'string',
            ui: {
              showLabel: false
            }
          }, {
            ui: {
              label: 'my_name',
              noLabelSpace: true
            }
          }]
        },
        obj: {
          allOf: [{
            type: 'object'
          }, {
          }]
        },
        arr: {
          allOf: [{
            type: 'array',
            value: [123, 234, 345]
          }, {
            value: [345, 456]
          }]
        }
      }
    };
    const newFormSchema = ncformUtils.perfectFormSchema(formSchema);
    assert.equal(newFormSchema.ui.showLabel, true);
    assert.equal(newFormSchema.ui.showIdxLabel, false);
    assert.equal(newFormSchema.ui.showLegend, true);
    assert.equal(newFormSchema.ui.noLabelSpace, false);
    assert.equal(newFormSchema.properties.name.ui.label, 'my_name');
    assert.equal(newFormSchema.properties.name.ui.showLabel, false);
    assert.equal(newFormSchema.properties.name.ui.showIdxLabel, false);
    assert.equal(newFormSchema.properties.name.ui.noLabelSpace, true);
    assert.equal(newFormSchema.properties.obj.ui.label, 'obj');
    assert.equal(newFormSchema.properties.obj.ui.showLabel, true);
    assert.equal(newFormSchema.properties.obj.ui.showIdxLabel, false);
    assert.equal(newFormSchema.properties.obj.ui.showLegend, false);
    assert.equal(newFormSchema.properties.arr.ui.label, 'arr');
    assert.equal(newFormSchema.properties.arr.ui.showLabel, true);
    assert.equal(newFormSchema.properties.arr.ui.showIdxLabel, true);
    assert.equal(newFormSchema.properties.arr.ui.showLegend, false);
    assert.deepEqual(newFormSchema.properties.arr.value, [123, 234, 345, 456]);
  });

  // --- getModelFromSchema

  it("getModelFromSchema - object type has value", () => {
    const formSchema = {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          value: 'daniel',
          default: 'name',
          ui: {
            label: 'Username'
          }
        },
        age: {
          type: 'integer',
          value: 5,
          default: 6,
          ui: {
            label: 'Age'
          }
        }
      }
    };
    const result = ncformUtils.getModelFromSchema(formSchema);
    assert(result.username === 'daniel' && result.age === 5);
  });
  it("getModelFromSchema - object type only default value", () => {
    const formSchema = {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          default: 'daniel',
          ui: {
            label: 'Username'
          }
        },
        age: {
          type: 'integer',
          default: 5,
          ui: {
            label: 'Age'
          }
        }
      }
    };
    const result = ncformUtils.getModelFromSchema(formSchema);
    assert(result.username === 'daniel' && result.age === 5);
  });
  it("getModelFromSchema - object type only default value default value is dx expression", () => {
    const formSchema = {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          default: 'dx: "hello " + "daniel"',
          ui: {
            label: 'Username'
          }
        },
        age: {
          type: 'integer',
          default: 'dx: 5 + 1',
          ui: {
            label: 'Age'
          }
        }
      }
    };
    const result = ncformUtils.getModelFromSchema(formSchema);
    assert(result.username === 'hello daniel' && result.age === 6);
  });
  it("getModelFromSchema - object type The bottom value is higher than the superior", () => {
    const formSchema = {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          value: 'daniel',
          default: 'name',
          ui: {
            label: 'Username'
          }
        },
        age: {
          type: 'integer',
          value: 5,
          default: 6,
          ui: {
            label: 'Age'
          }
        }
      },
      value: {
        username: 'sarah',
        age: 8
      }
    };
    const result = ncformUtils.getModelFromSchema(formSchema);
    assert(result.username === 'daniel' && result.age === 5);
  });
  it("getModelFromSchema - array type has value", () => {
    const formSchema = {
      type: 'object',
      properties: {
        user: {
          type: 'array',
          items: {
            type: 'string'
          },
          value: [
            {
              __dataSchema: {
                type: 'string',
                value: 'daniel',
                default: 'hi'
              }
            },
            {
              __dataSchema: {
                type: 'string',
                value: 'xiao',
                default: 'hi'
              }
            }
          ]
        }
      }
    };
    const result = ncformUtils.getModelFromSchema(formSchema);
    assert(JSON.stringify(result.user) === JSON.stringify(['daniel', 'xiao']));
  });
  it("getModelFromSchema - array type only default value", () => {
    const formSchema = {
      type: 'object',
      properties: {
        user: {
          type: 'array',
          items: {
            type: 'string',
            default: 'hi'
          },
          default: ['hi', 'daniel']
        }
      }
    };
    const result = ncformUtils.getModelFromSchema(formSchema);
    assert(JSON.stringify(result.user) === JSON.stringify(['hi', 'daniel']));
  });
  it("getModelFromSchema - array type only default value dx expression", () => {
    const formSchema = {
      type: 'object',
      properties: {
        user: {
          type: 'array',
          items: {
            type: 'string',
            default: 'hi'
          },
          default: 'dx: ["hi", "hi"]'
        }
      }
    };
    const result = ncformUtils.getModelFromSchema(formSchema);
    assert(JSON.stringify(result.user) === JSON.stringify(['hi', 'hi']));
  });
  it("getModelFromSchema - array type has no value", () => {
    const formSchema = {
      type: 'object',
      properties: {
        user: {
          type: 'array',
          items: {
            type: 'string'
          },
          value: []
        }
      }
    };
    const result = ncformUtils.getModelFromSchema(formSchema);
    assert(JSON.stringify(result.user) === JSON.stringify([]));
  });
  it("getModelFromSchema - uppercase types, such as HTML, COMP type values are automatically filtered out", () => {
    const formSchema = {
      type: 'object',
      properties: {
        user: {
          type: 'string',
          value: 'daniel'
        },
        _line1: {
          type: 'HTML',
          value: '------'
        },
        _line2: {
          type: 'COMP',
          value: 'SomeLineComp'
        }
      }
    };
    const result = ncformUtils.getModelFromSchema(formSchema);
    assert(JSON.stringify(result) === JSON.stringify({ user: 'daniel' }));
  });

  // --- setValueToSchema

  it("setValueToSchema - ordinary object", () => {
    const value = {
      name: 'daniel'
    };
    const formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(formSchema.properties.name.value === value.name);
  });
  it("setValueToSchema - nested object", () => {
    const value = {
      name: {
        firstname: 'daniel',
        lastname: 'xiao'
      }
    };
    const formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          properties: {
            firstname: { type: 'string' },
            lastname: { type: 'string' }
          }
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(
      formSchema.properties.name.properties.firstname.value ===
        value.name.firstname
    );
    assert(
      formSchema.properties.name.properties.lastname.value ===
        value.name.lastname
    );
  });
  it("setValueToSchema - nested array of objects", () => {
    const value = {
      name: ['daniel', 'xiao']
    };
    const formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'array',
          item: {
            type: 'string'
          }
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(formSchema.properties.name.value === value.name);
  });
  it("setValueToSchema - nested array of objects and then objects", () => {
    const value = {
      user: [
        {
          name: "jorge"
        },
        {
          name: "ping"
        }
      ]
    };
    const formSchema = {
      type: 'object',
      properties: {
        user: {
          type: 'array',
          item: {
            type: 'object',
            properties: {
              name: "string"
            }
          }
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(
      JSON.stringify(formSchema.properties.user.value) ===
        JSON.stringify(value.user)
    );
  });
  it("setValueToSchema - ordinary array", () => {
    const value = ['daniel', 'sarah'];
    const formSchema = {
      type: 'array',
      items: {
        type: 'string'
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(formSchema.value === value);
  });
  it("setValueToSchema - nested array", () => {
    const value = [['hi'], ['hello']];
    const formSchema = {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(formSchema.value === value);
  });
  it("setValueToSchema - non-schema object", () => {
    const value = {
      name: {
        firstname: 'daniel'
      }
    };
    const formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'object'
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(
      JSON.stringify(formSchema.properties.name.value) ===
        JSON.stringify({ firstname: 'daniel' })
    );
  });
  it("setValueToSchema - non-schema array", () => {
    const value = {
      name: ['daniel', 'hi']
    };
    const formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'array'
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(
      JSON.stringify(formSchema.properties.name.value) ===
        JSON.stringify(value.name)
    );
  });
  it("setValueToSchema - null value assignment default value", () => {
    let value;
    let formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          properties: {
            firstname: {
              type: 'string'
            },
            age: {
              type: 'number'
            },
            marry: {
              type: 'boolean'
            },
            info: {
              type: 'object'
            },
            tags: {
              type: 'array'
            }
          }
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(formSchema.properties.name.properties.firstname.value === '');
    assert(formSchema.properties.name.properties.age.value === '');
    assert(formSchema.properties.name.properties.marry.value === false);
    assert(
      JSON.stringify(formSchema.properties.name.properties.info.value) ===
        JSON.stringify({})
    );
    assert(
      JSON.stringify(formSchema.properties.name.properties.tags.value) ===
        JSON.stringify([])
    );

    value = {};
    formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          default: {
            firstname: 'daniel'
          }
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(
      JSON.stringify(formSchema.properties.name.value) ===
        JSON.stringify({ firstname: 'daniel' })
    );
  });
  it("setValueToSchema - mandatory overwrite sub-value", () => {
    const value = {
      name: ['daniel', 'hi']
    };
    let formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'array',
          value: ['sarah']
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema);
    assert(
      JSON.stringify(formSchema.properties.name.value) ===
        JSON.stringify(['sarah'])
    );

    formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'array',
          value: ['sarah']
        }
      }
    };
    ncformUtils.setValueToSchema(value, formSchema, true);
    assert(
      JSON.stringify(formSchema.properties.name.value) ===
        JSON.stringify(value.name)
    );
  });

  // --- getSchemaByPath
  it("getSchemaByPath - pure object type", () => {
    let fromSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      }
    };
    let result = ncformUtils.getSchemaByPath(fromSchema, 'name');
    assert(JSON.stringify(result) === JSON.stringify({ type: 'string' }));

    fromSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          properties: {
            firstname: {
              type: 'string'
            }
          }
        }
      }
    };
    result = ncformUtils.getSchemaByPath(fromSchema, 'name.firstname');
    assert(JSON.stringify(result) === JSON.stringify({ type: 'string' }));
  });
  it("getSchemaByPath - has an array type", () => {
    let fromSchema = {
      type: 'object',
      properties: {
        names: {
          type: 'array',
          items: {
            type: 'string'
          },
          value: [
            {
              __dataSchema: {
                type: 'string'
              }
            },
            {
              __dataSchema: {
                type: 'string'
              }
            }
          ]
        }
      }
    };
    let result = ncformUtils.getSchemaByPath(fromSchema, 'names[0]');
    assert(JSON.stringify(result) === JSON.stringify({ type: 'string' }));

    fromSchema = {
      type: 'object',
      properties: {
        person: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              phones: {
                type: 'array',
                items: {
                  type: 'string'
                }
              }
            }
          },
          value: [
            {
              __dataSchema: {
                type: 'object',
                properties: {
                  phones: {
                    type: 'array',
                    items: {
                      type: 'string'
                    },
                    value: [
                      {
                        __dataSchema: {
                          type: 'string'
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    };
    result = ncformUtils.getSchemaByPath(fromSchema, 'person[0].phones[0]');
    assert(JSON.stringify(result) === JSON.stringify({ type: 'string' }));
  });
  it("getSchemaByPath - between array items", () => {
    let fromSchema = {
      type: 'object',
      properties: {
        names: {
          type: 'array',
          items: {
            type: 'string'
          },
          value: [
            {
              __dataSchema: {
                type: 'string'
              }
            },
            {
              __dataSchema: {
                type: 'string'
              }
            }
          ]
        }
      }
    };
    let result = ncformUtils.getSchemaByPath(fromSchema, 'names[i]', '0');
    assert(JSON.stringify(result) === JSON.stringify({ type: 'string' }));

    fromSchema = {
      type: 'object',
      properties: {
        person: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              phones: {
                type: 'array',
                items: {
                  type: 'string'
                }
              }
            }
          },
          value: [
            {
              __dataSchema: {
                type: 'object',
                properties: {
                  phones: {
                    type: 'array',
                    items: {
                      type: 'string'
                    },
                    value: [
                      {
                        __dataSchema: {
                          type: 'string'
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    };
    result = ncformUtils.getSchemaByPath(
      fromSchema,
      'person[i].phones[i]',
      '0,0'
    );
    assert(JSON.stringify(result) === JSON.stringify({ type: 'string' }));
  });

  // --- smartAnalyzeVal

  it("smartAnalyzeVal - regular value", () => {
    let result = ncformUtils.smartAnalyzeVal('hello daniel');
    assert(result === 'hello daniel');
    result = ncformUtils.smartAnalyzeVal(true);
    assert(result === true);
    result = ncformUtils.smartAnalyzeVal(11);
    assert(result === 11);
    result = ncformUtils.smartAnalyzeVal({ name: 'daniel' });
    assert(JSON.stringify(result) === JSON.stringify({ name: 'daniel' }));
    result = ncformUtils.smartAnalyzeVal(['daniel']);
    assert(JSON.stringify(result) === JSON.stringify(['daniel']));
  });

  it("smartAnalyzeVal - function value", () => {
    const rootData = { name: 'daniel' };
    const sayHi = 'hi';

    const val = function(formData) {
      return `${sayHi} ${formData.name}` === 'hi daniel';
    };
    const result = ncformUtils.smartAnalyzeVal(val, { data: { rootData } });
    assert(result === true);
  });

  it("smartAnalyzeVal - function get path", () => {
    const rootData = { name: 'daniel', sign: '!' };
    const sayHi = 'hi';

    const val = function(formData, constData, selfData, tempData, selfPath, itemIdxChain) {
      return `${sayHi} ${formData.name}${formData[selfPath]}` === 'hi daniel!';
    };
    const result = ncformUtils.smartAnalyzeVal(val, { data: { rootData, selfPath: "sign" } });
    assert(result === true);
  });

  it("smartAnalyzeVal - function value array item", () => {
    let rootData = { users: [{ name: 'daniel' }, { name: 'sarah' }] };
    const sayHi = 'hi';

    let val = function(formData, constData, selfData, tempData, selfPath, itemIdxChain) {
      return `${sayHi} ${formData.users[itemIdxChain[0]].name}` === 'hi sarah';
    };
    let result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '1',
      data: { rootData }
    });
    assert(result === true);

    rootData = {
      users: [{ address: [{ name: 'beijing' }, { name: 'shanghai' }] }]
    };

    val = function(formData, constData, selfData, tempData, selfPath, itemIdxChain) {
      const [i, j] = itemIdxChain;
      return `${sayHi} ${formData.users[i].address[j].name}` === 'hi shanghai';
    };
    result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '0,1',
      data: { rootData }
    });
    assert(result === true);

    val = function(formData, constData, selfData, tempData, selfPath, itemIdxChain) {
      return `${selfPath}` === 'users[0].address[1].name';
    };
    result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '0,1',
      data: { rootData, selfPath: "users[i].address[i].name" }
    });
    assert(result === true);
  });

  it("smartAnalyzeVal - special string", () => {
    const rootData = { persons: [{ age: 18 }, { age: 20 }] };
    const constData = { max: 18 };

    let val = 'dx: {{$root.persons[0].age}} === 18';
    let result = ncformUtils.smartAnalyzeVal(val, { data: { rootData } });
    assert(result === true);

    val = 'dx: {{$root.persons[i].age}} > 19';
    result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '1',
      data: { rootData }
    });
    assert(result === true);

    val = 'dx: {{$root.persons[i].age}} < 19';
    result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '1',
      data: { rootData }
    });
    assert(result === false);

    val = 'dx: {{$root.persons[i].age}} === {{$const.max}}';
    result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '0',
      data: { rootData, constData }
    });
    assert(result === true);

    val = 'dx: {{$self}}';
    result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '0',
      data: { selfData: 'hello daniel' }
    });
    assert(result === 'hello daniel');

    val = 'dx: {{$path}}';
    result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '0',
      data: { selfPath: 'persons[i].age' }
    });
    assert(result === 'persons[0].age');

    val = 'dx: __get({{$root}}, {{$path}})';
    result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '1',
      data: { rootData, selfPath: 'persons[i].age' }
    });
    assert(result === 20);
  });

  it("smartAnalyzeVal - special string nested array", () => {
    const rootData = {
      persons: [[{ age: 12 }, { age: 18 }], [{ age: 50 }, { age: 80 }]]
    };

    let val = 'dx: {{$root.persons[i][i].age}} === 50';
    let result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '1,0',
      data: { rootData }
    });
    assert(result === true);

    val = 'dx: __get({{$root}}, {{$path}}) === 50';
    result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '1,0',
      data: { rootData, selfPath: 'persons[i][i].age' }
    });
    assert(result === true);

    val = 'dx: __get({{$root}}, {{$path}}) === 18';
    result = ncformUtils.smartAnalyzeVal(val, {
      idxChain: '0,1',
      data: { rootData, selfPath: 'persons[i][i].age' }
    });
    assert(result === true);
  });

  // --- smartAnalyze
  it("smartAnalyze - regular value", () => {
    let result = ncformUtils.smartAnalyze('hello daniel');
    assert(result === 'hello daniel');
    result = ncformUtils.smartAnalyze(true);
    assert(result === true);
    result = ncformUtils.smartAnalyze(11);
    assert(result === 11);
    result = ncformUtils.smartAnalyze({ name: 'daniel' });
    assert(JSON.stringify(result) === JSON.stringify({ name: 'daniel' }));
    result = ncformUtils.smartAnalyze(['daniel']);
    assert(JSON.stringify(result) === JSON.stringify(['daniel']));
  });
  it("smartAnalyze - function value", () => {
    const val = function(itemValue, formData) {
      return `${formValue.name}'s age is ${itemValue.age}`;
    };
    const itemValue = { age: 18 };
    let formValue = { name: 'daniel' };
    const result = ncformUtils.smartAnalyze(val, {
      data: [
        { symbol: '$item', value: itemValue },
        { symbol: '$form', value: formValue }
      ]
    });
    assert(result === "daniel's age is 18");
  });
  it("smartAnalyze - special string", () => {
    const value = { age: 2 };
    const val = 'dx: {{$item.age}} + 18';
    const result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$item', value }]
    });
    assert(result === 20);
  });
  it("smartAnalyze - dx expression", () => {
    let value = [{ id: 2 }, { id: 4 }];
    let val = 'dx: {{$selected[e].id}}';
    let result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$selected', value }]
    });
    assert(JSON.stringify(result) === JSON.stringify([2, 4]));

    value = ['daniel', 'sarah'];
    val = 'dx: {{$selected[e]}}';
    result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$selected', value }]
    });
    assert(JSON.stringify(result) === JSON.stringify(value));

    value = { name: [{ id: 2 }, { id: 4 }] };
    val = 'dx: {{$selected.name[e].id}}';
    result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$selected', value }]
    });
    assert(JSON.stringify(result) === JSON.stringify([2, 4]));

    value = { name: [[{ id: 1 }, { id: 11 }], [{ id: 2 }]] };
    val = 'dx: {{$selected.name[0][e].id}}';
    result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$selected', value }]
    });
    assert(JSON.stringify(result) === JSON.stringify([1, 11]));
  });
  it("smartAnalyze - root data is an array", () => {
    let value = ['hi', 'hello'];
    let val = 'dx: {{$items[0]}} + " daniel"';
    let result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$items', value }]
    });
    assert(result === 'hi daniel');

    value = ['hi', 'hello'];
    val = 'dx: {{$items[i]}} + " daniel"';
    result = ncformUtils.smartAnalyze(val, {
      idxChain: '1',
      data: [{ symbol: '$items', value }]
    });
    assert(result === 'hello daniel');

    value = ['hi', 'hello'];
    val = 'dx: {{$items[e]}}';
    result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$items', value }]
    });
    assert(result[0] === 'hi' && result[1] === 'hello');

    value = [{ msg: 'hi' }, { msg: 'hello' }];
    val = 'dx: {{$items[i].msg}} + " daniel"';
    result = ncformUtils.smartAnalyze(val, {
      idxChain: '1',
      data: [{ symbol: '$items', value }]
    });
    assert(result === 'hello daniel');
  });
  it("smartAnalyze - the root data is the object (directly accessed)", () => {
    const value = { age: 2 };
    const val = 'dx: {{$item}}';
    const result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$item', value }]
    });
    assert(result.age === 2);
  });
  it("smartAnalyze - the root data is an array, directly access the array value", () => {
    const value = ['daniel', 'sarah'];
    const val = 'dx: {{$items}}';
    const result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$items', value }]
    });
    assert(result[0] === 'daniel');
  });
  it("smartAnalyze - root data is primitive type", () => {
    const value = 'hi';
    const val = 'dx: {{$msg}} + " daniel"';
    const result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$msg', value }]
    });
    assert(result === 'hi daniel');
  });
  it("smartAnalyze - take a value that does not exist", () => {
    const value = {};
    const val = 'dx: {{$data.name}}';
    const result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$data', value }]
    });
    assert(result === undefined);
  });

  it("smartAnalyze - do not modify the input data", () => {
    const value = { name: 'kyle' };
    const val = 'dx: {{$data.name}}';
    const valueString1 = JSON.stringify(value);
    const result = ncformUtils.smartAnalyze(val, {
      data: [{ symbol: '$data', value }]
    });
    const valueString2 = JSON.stringify(value);
    assert(valueString1 === valueString2);
  });

  // --- getDefVal
  it("getDefVal - verify that the default values of all data types are correct", () => {
    const stringDefVal = ncformUtils.getDefVal('string');
    assert(stringDefVal === '');

    const numberDefVal = ncformUtils.getDefVal('number');
    assert(numberDefVal === '');

    const integerDefVal = ncformUtils.getDefVal('integer');
    assert(integerDefVal === '');

    const booleanDefVal = ncformUtils.getDefVal('boolean');
    assert(booleanDefVal === false);

    const objectDefVal = ncformUtils.getDefVal('object');
    assert(JSON.stringify(objectDefVal) === JSON.stringify({}));

    const arrayDefVal = ncformUtils.getDefVal('array');
    assert(arrayDefVal.length === 0);
  });

  // --- getValType
  it("getValType - verify that all data types are correct", () => {
    const undefinedType = ncformUtils.getValType(undefined);
    assert(undefinedType === 'undefined');

    const stringType = ncformUtils.getValType('hi');
    assert(stringType === 'string');

    const numberType = ncformUtils.getValType(11);
    assert(numberType === 'number');

    const arrayType = ncformUtils.getValType([]);
    assert(arrayType === 'array');

    const objectType = ncformUtils.getValType({});
    assert(objectType === 'object');

    const bolleanType = ncformUtils.getValType(true);
    assert(bolleanType === 'boolean');
  });

  // --- notEmptyVal
  it("notEmptyVal - verify empty data for all data types", () => {
    let result = ncformUtils.notEmptyVal(undefined);
    assert(!result);

    result = ncformUtils.notEmptyVal('');
    assert(!result);

    result = ncformUtils.notEmptyVal(NaN);
    assert(!result);

    result = ncformUtils.notEmptyVal([]);
    assert(!result);

    result = ncformUtils.notEmptyVal({});
    assert(!result);

    result = ncformUtils.notEmptyVal(false);
    assert(result);
  });

  // --- priorityGetValue
  it("priorityGetValue - basic type", () => {
    let result = ncformUtils.priorityGetValue(
      'basic',
      'first',
      'daniel',
      'simon'
    );
    assert(result === 'first');
    result = ncformUtils.priorityGetValue(
      'basic',
      undefined,
      'daniel',
      'simon'
    );
    assert(result === 'daniel');
    result = ncformUtils.priorityGetValue('basic', undefined, null, 'simon');
    assert(result === 'simon');
  });
  it("priorityGetValue - object type", () => {
    let result = ncformUtils.priorityGetValue(
      'object',
      { a: 1 },
      { b: 2 },
      { a: 2 }
    );
    assert(JSON.stringify(result) === JSON.stringify({ a: 1, b: 2 }));
    result = ncformUtils.priorityGetValue(
      'object',
      undefined,
      { a: 1 },
      { a: 2 }
    );
    assert(JSON.stringify(result) === JSON.stringify({ a: 1 }));
    result = ncformUtils.priorityGetValue('object', undefined, null, { a: 1 });
    assert(JSON.stringify(result) === JSON.stringify({ a: 1 }));
  });
  it("priorityGetValue - array type", () => {
    let result = ncformUtils.priorityGetValue(
      'array',
      ['a'],
      ['b'],
      ['a', 'c']
    );
    assert(JSON.stringify(result) === JSON.stringify(['a', 'c']));
    result = ncformUtils.priorityGetValue(
      'array',
      undefined,
      [{ a: 1 }],
      [{ b: 1 }]
    );
    assert(result[0].a == 1 && result[0].b === 1);
    result = ncformUtils.priorityGetValue('object', undefined, null, ['a']);
    assert(JSON.stringify(result) === JSON.stringify(['a']));
  });

  // --- genRandomId
  it("genRandomId", () => {
    let result = ncformUtils.genRandomId();
    assert(result.length === 5);
    result = ncformUtils.genRandomId(8);
    assert(result.length === 8);
    result = ncformUtils.genRandomId(11);
    assert(result.length === 10);
  });

  // --- traverseJSON
  it("traverseJSON", () => {
    let json = { a: 1, b: null };
    let result = ncformUtils.traverseJSON(json, (key, val) => {
      if (val !== null && typeof val !== "object") return val + 1;
      return val;
    });
    assert(result.a === 2);
    assert(result.b === null);

    json = { a: { b: 1, c: { d: 2 } } };
    result = ncformUtils.traverseJSON(json, (key, val) => {
      if (val !== null && typeof val !== "object") return val + 1;
      return val;
    });
    assert(result.a.b === 2);
    assert(result.a.c.d === 3);

    json = { a: [1, [2]] };
    result = ncformUtils.traverseJSON(json, (key, val) => {
      if (val !== null && typeof val !== "object") return val + 1;
      return val;
    });
    assert(result.a[0] === 2);
    assert(result.a[1][0] === 3);

    json = { a: [1, { b: 2 }] };
    result = ncformUtils.traverseJSON(json, (key, val) => {
      if (val !== null && typeof val !== "object") return val + 1;
      return val;
    });
    assert(result.a[0] === 2);
    assert(result.a[1].b === 3);

    json = [1, { a: 2 }];
    result = ncformUtils.traverseJSON(json, (key, val) => {
      if (val !== null && typeof val !== "object") return val + 1;
      return val;
    });
    assert(result[0] === 2);
    assert(result[1].a === 3);
  });
});
