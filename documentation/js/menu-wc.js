'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">hr-automation-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1af0ce5de3a73d86f2a1e69d9a0defb253be351d9101864b5f0498ff21a54381d9b8846a63b2739a5db5897ef00141811a3f7904a6d9ea31040bb07ed6d0f6ff"' : 'data-target="#xs-components-links-module-AppModule-1af0ce5de3a73d86f2a1e69d9a0defb253be351d9101864b5f0498ff21a54381d9b8846a63b2739a5db5897ef00141811a3f7904a6d9ea31040bb07ed6d0f6ff"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1af0ce5de3a73d86f2a1e69d9a0defb253be351d9101864b5f0498ff21a54381d9b8846a63b2739a5db5897ef00141811a3f7904a6d9ea31040bb07ed6d0f6ff"' :
                                            'id="xs-components-links-module-AppModule-1af0ce5de3a73d86f2a1e69d9a0defb253be351d9101864b5f0498ff21a54381d9b8846a63b2739a5db5897ef00141811a3f7904a6d9ea31040bb07ed6d0f6ff"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppPipesModule.html" data-type="entity-link" >AppPipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppPipesModule-50dc773bb90fb2bf6104d8e2bf9da60c10d53e3bd20129d42612cae49d9c7be40b28b8737ab8cdbddd8823eaf18c63a39afa20123b7db1764bc461f948a4a933"' : 'data-target="#xs-pipes-links-module-AppPipesModule-50dc773bb90fb2bf6104d8e2bf9da60c10d53e3bd20129d42612cae49d9c7be40b28b8737ab8cdbddd8823eaf18c63a39afa20123b7db1764bc461f948a4a933"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppPipesModule-50dc773bb90fb2bf6104d8e2bf9da60c10d53e3bd20129d42612cae49d9c7be40b28b8737ab8cdbddd8823eaf18c63a39afa20123b7db1764bc461f948a4a933"' :
                                            'id="xs-pipes-links-module-AppPipesModule-50dc773bb90fb2bf6104d8e2bf9da60c10d53e3bd20129d42612cae49d9c7be40b28b8737ab8cdbddd8823eaf18c63a39afa20123b7db1764bc461f948a4a933"' }>
                                            <li class="link">
                                                <a href="pipes/FullnamePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FullnamePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/StatusPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatusPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CandidateDetailModule.html" data-type="entity-link" >CandidateDetailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CandidateDetailModule-108580584ebace9d0dcfc78a6a807118b45ce25ca8c0278e7c38a7904e83e57d22dbc6198e1f8c846a7bc0855f684e6b5dec15ec13030ec12692681831a0ce2f"' : 'data-target="#xs-components-links-module-CandidateDetailModule-108580584ebace9d0dcfc78a6a807118b45ce25ca8c0278e7c38a7904e83e57d22dbc6198e1f8c846a7bc0855f684e6b5dec15ec13030ec12692681831a0ce2f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CandidateDetailModule-108580584ebace9d0dcfc78a6a807118b45ce25ca8c0278e7c38a7904e83e57d22dbc6198e1f8c846a7bc0855f684e6b5dec15ec13030ec12692681831a0ce2f"' :
                                            'id="xs-components-links-module-CandidateDetailModule-108580584ebace9d0dcfc78a6a807118b45ce25ca8c0278e7c38a7904e83e57d22dbc6198e1f8c846a7bc0855f684e6b5dec15ec13030ec12692681831a0ce2f"' }>
                                            <li class="link">
                                                <a href="components/AddCommentModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCommentModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CandidateActionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidateActionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CandidateCommunicationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidateCommunicationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CandidateDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidateDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CandidateFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidateFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CandidateMainInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidateMainInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CandidateUpdatesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidateUpdatesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommunicationCommentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommunicationCommentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCandidateModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCandidateModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CandidateModule.html" data-type="entity-link" >CandidateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CandidateModule-1bab7fc73e81f7b350533d1732149013e6597bb376eb79de4f43c73aff000542c3526ec80c79657cacddda3cfa374444f7afd3fe6a5087f00ce611d263b660c1"' : 'data-target="#xs-components-links-module-CandidateModule-1bab7fc73e81f7b350533d1732149013e6597bb376eb79de4f43c73aff000542c3526ec80c79657cacddda3cfa374444f7afd3fe6a5087f00ce611d263b660c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CandidateModule-1bab7fc73e81f7b350533d1732149013e6597bb376eb79de4f43c73aff000542c3526ec80c79657cacddda3cfa374444f7afd3fe6a5087f00ce611d263b660c1"' :
                                            'id="xs-components-links-module-CandidateModule-1bab7fc73e81f7b350533d1732149013e6597bb376eb79de4f43c73aff000542c3526ec80c79657cacddda3cfa374444f7afd3fe6a5087f00ce611d263b660c1"' }>
                                            <li class="link">
                                                <a href="components/ActionsBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionsBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CandidateItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidateItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CandidatesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidatesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MergeModule.html" data-type="entity-link" >MergeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MergeModule-1324f53ee01bb40b0200f556411c1a84b60f01f1594fdcaad09fee836a75273752a52f41fdb342356524c954318537e00664a2a6eeaaedb2530acb35eec86733"' : 'data-target="#xs-components-links-module-MergeModule-1324f53ee01bb40b0200f556411c1a84b60f01f1594fdcaad09fee836a75273752a52f41fdb342356524c954318537e00664a2a6eeaaedb2530acb35eec86733"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MergeModule-1324f53ee01bb40b0200f556411c1a84b60f01f1594fdcaad09fee836a75273752a52f41fdb342356524c954318537e00664a2a6eeaaedb2530acb35eec86733"' :
                                            'id="xs-components-links-module-MergeModule-1324f53ee01bb40b0200f556411c1a84b60f01f1594fdcaad09fee836a75273752a52f41fdb342356524c954318537e00664a2a6eeaaedb2530acb35eec86733"' }>
                                            <li class="link">
                                                <a href="components/ActionsBarMergeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionsBarMergeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MergeCandidateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MergeCandidateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MergeCellComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MergeCellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MergePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MergePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-46cc61183b741cfdec82c4d2f070c71fe099b2ea7bab212d3c8befad58af22661b160aaee5caaf8c5ebee3793d1aa75ad94cefa6a5d73eb7dd666f667fb2d7bb"' : 'data-target="#xs-components-links-module-SharedModule-46cc61183b741cfdec82c4d2f070c71fe099b2ea7bab212d3c8befad58af22661b160aaee5caaf8c5ebee3793d1aa75ad94cefa6a5d73eb7dd666f667fb2d7bb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-46cc61183b741cfdec82c4d2f070c71fe099b2ea7bab212d3c8befad58af22661b160aaee5caaf8c5ebee3793d1aa75ad94cefa6a5d73eb7dd666f667fb2d7bb"' :
                                            'id="xs-components-links-module-SharedModule-46cc61183b741cfdec82c4d2f070c71fe099b2ea7bab212d3c8befad58af22661b160aaee5caaf8c5ebee3793d1aa75ad94cefa6a5d73eb7dd666f667fb2d7bb"' }>
                                            <li class="link">
                                                <a href="components/ErrorDisplayComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewCandidateModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewCandidateModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignInModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SystemModule.html" data-type="entity-link" >SystemModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SystemModule-d7fc29fa2d0de97d6e212c3ce565cd03c20b8f4140a60aa19a2286a856740369d1db25508a6c69d8d52ba3f480a97bd8e02ab95866d420a20709a3f9a3aacdec"' : 'data-target="#xs-components-links-module-SystemModule-d7fc29fa2d0de97d6e212c3ce565cd03c20b8f4140a60aa19a2286a856740369d1db25508a6c69d8d52ba3f480a97bd8e02ab95866d420a20709a3f9a3aacdec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SystemModule-d7fc29fa2d0de97d6e212c3ce565cd03c20b8f4140a60aa19a2286a856740369d1db25508a6c69d8d52ba3f480a97bd8e02ab95866d420a20709a3f9a3aacdec"' :
                                            'id="xs-components-links-module-SystemModule-d7fc29fa2d0de97d6e212c3ce565cd03c20b8f4140a60aa19a2286a856740369d1db25508a6c69d8d52ba3f480a97bd8e02ab95866d420a20709a3f9a3aacdec"' }>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CandidateFormComponent.html" data-type="entity-link" >CandidateFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CandidateItemComponent.html" data-type="entity-link" >CandidateItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CandidateUpdatesComponent.html" data-type="entity-link" >CandidateUpdatesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditCandidateModalComponent.html" data-type="entity-link" >EditCandidateModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorDisplayComponent.html" data-type="entity-link" >ErrorDisplayComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MergeCandidateComponent.html" data-type="entity-link" >MergeCandidateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewCandidateModalComponent.html" data-type="entity-link" >NewCandidateModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SignInModalComponent.html" data-type="entity-link" >SignInModalComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/MergeCandidates.html" data-type="entity-link" >MergeCandidates</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageState.html" data-type="entity-link" >PageState</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AttributesService.html" data-type="entity-link" >AttributesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CandidateDetailService.html" data-type="entity-link" >CandidateDetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CandidatesService.html" data-type="entity-link" >CandidatesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FetchService.html" data-type="entity-link" >FetchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HistoryService.html" data-type="entity-link" >HistoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MergeService.html" data-type="entity-link" >MergeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModalService.html" data-type="entity-link" >ModalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link" >NotificationService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AttributeType.html" data-type="entity-link" >AttributeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AttributeTypeDictionary.html" data-type="entity-link" >AttributeTypeDictionary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Candidate.html" data-type="entity-link" >Candidate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CandidateAttribute.html" data-type="entity-link" >CandidateAttribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CandidateAttributesValues.html" data-type="entity-link" >CandidateAttributesValues</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CandidateAttributeType.html" data-type="entity-link" >CandidateAttributeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CandidateDto.html" data-type="entity-link" >CandidateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CandidatesFilterData.html" data-type="entity-link" >CandidatesFilterData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommentData.html" data-type="entity-link" >CommentData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommunicationHistory.html" data-type="entity-link" >CommunicationHistory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HistoryElement.html" data-type="entity-link" >HistoryElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HistoryElementDto.html" data-type="entity-link" >HistoryElementDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFormData.html" data-type="entity-link" >IFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOptions.html" data-type="entity-link" >IOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IParam.html" data-type="entity-link" >IParam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Keywords.html" data-type="entity-link" >Keywords</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MergeCandidate.html" data-type="entity-link" >MergeCandidate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MergeCandidateAttribute.html" data-type="entity-link" >MergeCandidateAttribute</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});