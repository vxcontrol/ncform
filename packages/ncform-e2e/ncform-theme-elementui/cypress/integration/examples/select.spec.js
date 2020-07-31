/// <reference types="Cypress" />

import common from './common';

context('select', () => {
  before(() => {
    cy.visit('http://localhost:3004/examples/components/playground/index.html');
  });

  it('Basic', () => {
    let formSchema = {
      type: 'object',
      properties: {
        // has init value
        name0: {
          type: 'string',
          value: 'daniel',
          ui: {
            widget: 'select',
            widgetConfig: {
              enumSource: [
                {
                  value: 'daniel',
                  label: 'daniel'
                },
                {
                  value: 'sarah',
                  label: 'sarah'
                }
              ]
            }
          }
        },
        name1: {
          type: 'string',
          ui: {
            disabled: true,
            widget: 'select',
            widgetConfig: {
              enumSource: [
                {
                  value: 'daniel',
                  label: 'daniel'
                },
                {
                  value: 'sarah',
                  label: 'sarah'
                }
              ]
            }
          }
        },
        name2: {
          type: 'string',
          ui: {
            readonly: true,
            widget: 'select',
            widgetConfig: {
              enumSource: [
                {
                  value: 'daniel',
                  label: 'daniel'
                },
                {
                  value: 'sarah',
                  label: 'sarah'
                }
              ]
            }
          }
        },
        name3: {
          type: 'string',
          ui: {
            hidden: true,
            widget: 'select',
            widgetConfig: {
              enumSource: [
                {
                  value: 'daniel',
                  label: 'daniel'
                },
                {
                  value: 'sarah',
                  label: 'sarah'
                }
              ]
            }
          }
        },
        name4: {
          type: 'string',
          ui: {
            placeholder: 'your name',
            widget: 'select',
            widgetConfig: {
              enumSource: [
                {
                  value: 'daniel',
                  label: 'daniel'
                },
                {
                  value: 'sarah',
                  label: 'sarah'
                }
              ]
            }
          }
        }
      }
    };
    common.fillInSchema(formSchema);
    common.startRun();
    // common.submitForm();

    cy.get('.previewArea').within(() => {
      cy.get('label')
        .contains('name0')
        .as('nameLabel0');
      cy.get('@nameLabel0')
        .next()
        .find('input')
        .as('nameInput0');
      cy.get('@nameInput0').should('have.value', 'daniel');

      cy.get('label')
        .contains('name1')
        .as('nameLabel1');
      cy.get('@nameLabel1')
        .next()
        .find('input')
        .as('nameInput1');
      cy.get('@nameInput1').should('be.disabled');

      cy.get('label')
        .contains('name2')
        .as('nameLabel2');
      cy.get('@nameLabel2')
        .next()
        .find('input')
        .as('nameInput2');
      cy.get('@nameInput2').should('be.disabled');

      cy.get('label')
        .contains('name3')
        .as('nameLabel3');
      cy.get('@nameLabel3')
        .next()
        .find('input')
        .as('nameInput3');
      cy.get('@nameInput3').should('not.be.visible');

      cy.get('label')
        .contains('name4')
        .as('nameLabel4');
      cy.get('@nameLabel4')
        .next()
        .find('input')
        .as('nameInput4');
      cy.get('@nameInput4').should('have.prop', 'placeholder', 'your name');
    });
  });

  it('Simple Props', () => {
    let formSchema = {
      type: 'object',
      properties: {
        name1: {
          type: 'string',
          ui: {
            widget: 'select',
            widgetConfig: {
              multiple: true,
              clearable: true,
              filterable: true,
              enumSource: [
                {
                  value: 'daniel',
                  label: 'daniel'
                },
                {
                  value: 'sarah',
                  label: 'sarah'
                }
              ]
            }
          }
        },
        name2: {
          type: 'string',
          ui: {
            widget: 'select',
            widgetConfig: {
              multiple: false,
              clearable: false,
              filterable: false,
              enumSource: [
                {
                  value: 'daniel',
                  label: 'daniel'
                },
                {
                  value: 'sarah',
                  label: 'sarah'
                }
              ]
            }
          }
        },
        name3: {
          type: 'string',
          ui: {
            widget: 'select',
            widgetConfig: {
              itemTemplate: '<span>{{item.id}} : {{item.name}}</span>',
              itemLabelField: 'name',
              itemValueField: 'id',
              enumSource: [
                {
                  id: '1',
                  name: 'daniel'
                },
                {
                  id: '2',
                  name: 'sarah'
                }
              ]
            }
          }
        }
      }
    };
    cy.window()
      .its('editor')
      .invoke('setValue', JSON.stringify(formSchema, null, 2));
    common.startRun();

    cy.get('body').as('body');

    cy.get('.previewArea').within(() => {
      // Declare action elements
      cy.get('label')
        .contains('name1')
        .parent()
        .within(() => {
          // multiple: true
          cy.get('input')
            .eq(0)
            .focus();
          cy.get('@body')
            .find('li:contains("daniel")')
            .find(':not(:hidden)')
            .click()
            .should('be.visible');
          cy.get('@body')
            .find('li:contains("sarah")')
            .find(':not(:hidden)')
            .click()
            .should('be.visible');
          cy.get('.el-select__tags-text:contains("daniel")')
            .should('exist')
            .and('be.visible');
          cy.get('.el-select__tags-text:contains("sarah")')
            .should('exist')
            .and('be.visible');

          // filterable: true
          cy.get('input')
            .eq(0)
            .type('d')
            .should('have.value', 'd');
          cy.get('@body')
            .find('li:contains("sarah")')
            .should('not.be.visible');

          // clearable: true
          cy.get('.el-icon-arrow-up').trigger('mouseenter');
          cy.get('.el-icon-circle-close').click();
          cy.get('input')
            .eq(0)
            .should('have.value', '');
        });

      cy.wait(500);
      cy.get('label')
        .contains('name2')
        .parent()
        .within(() => {
          // filterable: false
          cy.get('input')
            .eq(0)
            .click()
            .should('has.have.prop', 'readonly');

          // multiple: false
          cy.get('@body')
            .find('li:contains("daniel")')
            .find(':not(:hidden)')
            .click()
            .should('be.visible');
          cy.get('@body')
            .find('li:contains("daniel")')
            .should('not.be.visible');
          cy.get('@body')
            .find('li:contains("sarah")')
            .should('not.be.visible');
          cy.get('input')
            .eq(0)
            .should('have.value', 'daniel');

          // clearable: false
          cy.get('.el-icon-arrow-up').trigger('mouseenter');
          cy.get('.el-icon-circle-close').should('not.be.visible');
        });

      cy.wait(100);
      cy.get('label')
        .contains('name3')
        .parent()
        .within(() => {
          cy.get('input')
            .eq(0)
            .click();

          cy.get('@body')
            .find('li:contains("1 : daniel")')
            .should('be.visible');
          cy.get('@body')
            .find('li:contains("2 : sarah")')
            .click()
            .should('be.visible');
          cy.get('input')
            .eq(0)
            .should('have.value', 'sarah');
        });

      // common.submitForm();
    });
  });

  it('enumSourceRemote', () => {
    let callCount = 0;
    cy.server();
    cy.route(() => {
      return {
        method: 'GET',
        url: '/list?**',
        response: {
          data: [
            {
              value: '1',
              label: 'daniel'
            },
            {
              value: '2',
              label: 'sarah'
            }
          ]
        },
        onRequest: () => {
          callCount++;
        }
      };
    }).as('list');

    cy.route(() => {
      return {
        method: 'GET',
        url: '/list1**',
        response: {
          data: [
            {
              value: '1',
              label: 'daniel'
            },
            {
              value: '2',
              label: 'sarah'
            }
          ]
        }
      };
    }).as('list1');

    let formSchema = {
      type: 'object',
      properties: {
        name1: {
          type: 'string',
          ui: {
            widget: 'select',
            widgetConfig: {
              filterable: true,
              filterLocal: true,
              enumSourceRemote: {
                remoteUrl: '/list',
                paramName: 'keyword',
                otherParams: {
                  status: 1
                },
                resField: 'data',
                selectFirstItem: true
              }
            }
          }
        },
        name2: {
          type: 'string',
          ui: {
            widget: 'select',
            widgetConfig: {
              filterable: true,
              filterLocal: false,
              enumSourceRemote: {
                remoteUrl: '/list',
                paramName: 'keyword',
                otherParams: {
                  status: 1
                },
                resField: 'data',
                selectFirstItem: false
              }
            }
          }
        },
        // filter > select > clear > select
        name3: {
          type: 'string',
          ui: {
            widget: 'select',
            widgetConfig: {
              filterable: true,
              filterLocal: false,
              enumSourceRemote: {
                remoteUrl: '/list1',
                itemTemplate: '<span>{{item.id}} : {{item.name}}</span>',
                resField: 'data'
              }
            }
          }
        }
      }
    };
    cy.window()
      .its('editor')
      .invoke('setValue', JSON.stringify(formSchema, null, 2));
    common.startRun();

    cy.get('body').as('body');

    cy.get('.previewArea').within(() => {
      // Declare action elements

      cy.get('label')
        .contains('name1')
        .parent()
        .within(() => {
          cy.wait('@list');
          cy.get('input')
            .eq(0)
            .should('have.value', 'daniel');
          expect(callCount).to.be.equal(2);
          cy.get('input')
            .eq(0)
            .type('da', {force: true});
          cy.get('@body')
            .find('li:contains("daniel")')
            .should('be.visible');
          cy.get('@body')
            .find('li:contains("sarah")')
            .should('not.be.visible');
          // filter from local
          cy.wait(100).then(() => expect(callCount).to.be.equal(2));

          cy.get('label').click();
        });

      cy.get('label')
        .contains('name2')
        .parent()
        .within(() => {
          cy.wait('@list');
          cy.get('input')
            .eq(0)
            .should('have.value', '');
          expect(callCount).to.be.equal(2);
          cy.get('input')
            .eq(0)
            .type('d', {force: true});

          // new http request
          cy.wait('@list').then(xhr => {
            expect(xhr.url.search('status=1&keyword=d')).to.be.greaterThan(0);
            expect(callCount).to.be.equal(3);
          });

          cy.get('@body')
            .find('li:contains("daniel"):visible')
            .click();
          cy.get('input')
            .eq(0)
            .should('have.value', 'daniel');
        });

      cy.get('label')
        .contains('name3')
        .parent()
        .within(() => {
          cy.wait('@list1');
          cy.get('input')
            .eq(0)
            .click();

          cy.get('@body')
            .find('li:contains("daniel"):visible:last')
            .click({force: true});
          cy.get('input')
            .eq(0)
            .should('have.value', 'daniel');

          cy.get('input')
            .eq(0)
            .click()
            .clear();

          cy.get('@body')
            .find('li:contains("sarah"):visible:last')
            .click();
          cy.get('input')
            .eq(0)
            .should('have.value', 'sarah');
        });

      // common.submitForm();
    });
  });

  it('dx-config', () => {
    cy.server();
    cy.route(() => {
      return {
        method: 'GET',
        url: '/list?**',
        response: {
          data: [
            {
              value: '1',
              label: 'daniel'
            },
            {
              value: '2',
              label: 'sarah'
            }
          ]
        }
      };
    }).as('list');

    let formSchema = {
      type: 'object',
      properties: {
        name0: {
          type: 'string'
        },
        name1: {
          type: 'string',
          ui: {
            widget: 'select',
            widgetConfig: {
              enumSourceRemote: {
                remoteUrl: '/list',
                otherParams: {
                  name: 'dx: {{$root.name0}}'
                },
                resField: 'data'
              }
            }
          }
        },
        name2: {
          type: 'string',
          default: JSON.stringify([
            {
              value: 1,
              label: 'option1'
            },
            {
              value: 2,
              label: 'option2'
            }
          ])
        },
        name3: {
          type: 'string',
          ui: {
            widget: 'select',
            widgetConfig: {
              enumSource: 'dx: try { JSON.parse({{$root.name2}}) } catch(e) { [] }'
            }
          }
        }
      }
    };
    cy.window()
      .its('editor')
      .invoke('setValue', JSON.stringify(formSchema, null, 2));
    common.startRun();

    cy.get('body').as('body');

    cy.get('.previewArea').within(() => {
      // Declare action elements
      cy.get('label')
        .contains('name0')
        .next()
        .find('input')
        .as('paramInput');
      cy.get('label')
        .contains('name2')
        .next()
        .find('input')
        .as('name2');

      cy.wait('@list');

      cy.get('label')
        .contains('name1')
        .parent()
        .within(() => {
          cy.get('@paramInput')
            .clear()
            .type('d');
          cy.wait('@list').then(xhr => {
            expect(xhr.url.search('name=d')).to.be.greaterThan(0);
          });

          cy.get('input')
            .eq(0)
            .click();
          cy.get('@body')
            .find('li:contains("sarah")')
            .find(':not(:hidden)')
            .click();
          cy.get('input')
            .eq(0)
            .should('have.value', 'sarah');

          cy.get('@paramInput').type('s');
          cy.wait('@list').then(xhr => {
            expect(xhr.url.search('name=ds')).to.be.greaterThan(0);

            cy.get('input')
              .eq(0)
              .should('have.value', '');
          });
        });

      cy.get('label')
        .contains('name3')
        .parent()
        .within(() => {
          cy.get('input')
            .eq(0)
            .click();
          cy.get('@body')
            .find('li:contains("option1")')
            .should('be.visible');

          cy.get('@name2')
            .clear()
            .type(JSON.stringify([{ value: 1, label: 'sarah' }, { value: 2, label: 'daniel' }]).replace(/([\{])/g, '{$1}'));
          cy.get('input')
            .eq(0)
            .click();
          cy.get('@body')
            .find('li:contains("option1")')
            .should('not.be.visible');
          cy.get('@body')
            .find('li:contains("daniel")')
            .should('be.visible');
        });
      // common.submitForm();
    });
  });

  it('itemDataKey', () => {
    cy.server();
    cy.route(() => {
      return {
        method: 'GET',
        url: '/list',
        response: {
          data: [
            {
              value: '1',
              label: 'daniel',
              desc: 'boy'
            },
            {
              value: '2',
              label: 'sarah',
              desc: 'girl'
            }
          ]
        }
      };
    }).as('list');

    let formSchema = {
      type: 'object',
      properties: {
        name1: {
          type: 'array',
          value: ['1'],
          ui: {
            description: 'dx: ({{$temp.selectedItem1}} || []).map(item => item.desc).join(",")',
            widget: 'select',
            widgetConfig: {
              itemDataKey: 'selectedItem1',
              multiple: true,
              enumSourceRemote: {
                remoteUrl: '/list',
                resField: 'data'
              }
            }
          }
        },
        name2: {
          type: 'string',
          value: '1',
          ui: {
            description: 'dx: {{$temp.selectedItem2.desc}}',
            widget: 'select',
            widgetConfig: {
              itemDataKey: 'selectedItem2',
              enumSource: [
                {
                  value: '1',
                  label: 'ncform',
                  desc: 'ncform is a very nice configuration generation way to develop forms'
                },
                {
                  value: '2',
                  label: 'daniel',
                  desc: 'Daniel is the author of ncform'
                }
              ]
            }
          }
        }
      }
    };
    cy.window()
      .its('editor')
      .invoke('setValue', JSON.stringify(formSchema, null, 2));
    common.startRun();

    cy.get('body').as('body');

    cy.get('.previewArea').within(() => {
      // Declare action elements
      cy.wait('@list');

      cy.get('label')
        .contains('name1')
        .parent()
        .within(() => {
          cy.get('.form-desc').as('desc');
          cy.get('@desc').should('have.text', 'boy');

          cy.get('input')
            .eq(0)
            .click({force: true});
          cy.get('@body')
            .find('li:contains("sarah")')
            .find(':not(:hidden)')
            .click();
          cy.get('@body').click();
          cy.get('@desc').should('have.text', 'boy,girl');
        });

      cy.wait(500);

      cy.get('label')
        .contains('name2')
        .parent()
        .within(() => {
          cy.get('.form-desc').as('desc');
          cy.get('@desc').should('have.text', 'ncform is a very nice configuration generation way to develop forms');

          cy.get('input')
            .eq(0)
            .click({force: true});
          cy.get('@body')
            .find('li:contains("daniel")')
            .find(':not(:hidden)')
            .click();
          cy.get('@desc').should('have.text', 'Daniel is the author of ncform');
        });
      // common.submitForm();
    });
  });
});
