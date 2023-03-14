<template>
  <div style="height: 100%;">
    <StatusBar/>
    <div class="container-fluid" style="height: 100%;">
      <div class="row no-gutters" style="height: 100%;">
        <div class="col-md-4 no-float left-panel" style="background: #252526; padding-left: 8px;">
          
          <div class="card rounded-0" style="margin-top: 5px; margin-bottom: 5px; width:100%">
            <div class="col-md-12" align="center"><img src="../../assets/banner.png" alt="" style="align: center;" height="50px"></div>
            <div class="card-header inwards_card"><h6 style="color: white;"><i class="fa fa-bar-chart" style="padding-right: 10px;"></i>Parameters</h6></div>
            <div class="card-body">
              <div class="row" style="margin-bottom: 0.1rem;">
                  <div class="col-md-12">
                    <p class="divider-text"><span class="bg-light">Data Source Selection</span></p>
                    <div class="funkyradio">
                      <div class="form-check form-check-inline funkyradio-primary">
                        <input name="chart_components" id="veryHigh" type="checkbox" class="form-check-input form-check-input" checked> 
                        <label for="veryHigh" class="form-check-label">IUCMA Data</label>
                      </div>
                      <div class="form-check form-check-inline funkyradio-primary">
                        <input name="chart_components" id="high" type="checkbox" class="form-check-input form-check-input" disabled> 
                        <label for="high" class="form-check-label">DWS Data</label>
                      </div>
                      <div class="form-check form-check-inline funkyradio-primary">
                        <input name="chart_components" id="merge" type="checkbox" class="form-check-input form-check-input" disabled> 
                        <label for="merge" class="form-check-label">Merge Datasets</label>
                      </div>                      
                    </div>
                  </div>
                </div>
              <div class="row">
                <div class="col-md-12">
                  <p class="divider-text"><span class="bg-light">Case Study Inputs</span></p>
                  <div class="form-group" style="margin-right: 0.5rem;">
                    <select class="form-control rounded-0 inwards_label" style="margin-left: 4px; margin-right: 10px; margin-top: 5px;" name="typeSelect" v-model="selectedType">                    <option value="" disabled selected hidden>Select a site type (e.g. River)</option>
                      <option class="dropdown-item inwards_label" v-for="siteType in types" v-bind:key="siteType.type" v-bind:value="siteType.type"> {{ siteType.type }} </option>                    
                    </select>
                </div>
                </div>
             </div>
             <div class="row">        
                <div class="col-md-12">
                  <div class="form-group" style="margin-right: 0.5rem;">
                  <select class="form-control rounded-0 inwards_label" style="margin-left: 4px; margin-right: 10px;" name="variableSelect" v-model="selectedVariable" placeholder="Please Select Water Quality Variable" @change="changeVariable()">
                    <option value="" disabled selected hidden>Select a variable</option>
                    <option class="dropdown-item" v-for="variable in variables" v-bind:key="variable.id" v-bind:value="[variable.mon_variable_abbr,variable.measure_unit_abbr]"> {{ variable.mon_variable_name }} </option>
                  </select>
                </div>
                </div>
             </div>
              <div class="row">
                <div class="col-sm-6" style="padding-right: 5px;">
                  <div class="form-group">
                    <input class="form-control rounded-0 inwards_label" id="dateStart" style="margin-left: 4px;" placeholder='Start Date' onfocus="(this.type='date')">
                  </div>
                </div>
                <div class="col-sm-6" style="padding-left: 2px;">
                  <div class="form-group" style="margin-right: 0.2rem;">
                    <input class="form-control rounded-0 inwards_label" id="dateEnd" style="margin-right: 0px;" placeholder='End Date' onfocus="(this.type='date')">
                  </div>
                </div>
              </div>
              <div class="row" style="margin-bottom: 0.1rem;">
                <div class="col-md-12">
                    <p class="divider-text"><span class="bg-light">Limits and Standards</span></p>
                    <div class="funkyradio">
                      <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="rqoLimits" type="checkbox"  checked="checked" class="form-check-input"> 
                        <label for="rqoLimits" class="form-check-label">RQOs</label>
                      </div> 
                        <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="sansLimits" type="checkbox" class="form-check-input" disabled> 
                        <label for="sansLimits" class="form-check-label">SANS241</label>
                      </div> 
                        <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="dwsDomestic" type="checkbox" class="form-check-input" disabled> 
                        <label for="dwsDomestic" class="form-check-label">DWS Domestic</label>
                      </div> 
                        <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="dwsIrrigation" type="checkbox"  class="form-check-input" disabled> 
                        <label for="dwsIrrigation" class="form-check-label">DWS Irrigation</label>
                      </div>
                      <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="dwsLivestock" type="checkbox"  class="form-check-input" disabled> 
                        <label for="dwsLivestock" class="form-check-label">DWS Livestock</label>
                      </div>
                      <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="dwsIndustry" type="checkbox"  class="form-check-input" disabled> 
                        <label for="dwsIndustry" class="form-check-label">DWS Industry</label>
                      </div>
                      <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="dwsNWRQOs" type="checkbox"  class="form-check-input" checked> 
                        <label for="dwsNWRQOs" class="form-check-label">DWS NWRQOs</label>
                      </div>
                  </div>
                    <p class="divider-text"><span class="bg-light">Hazard and Cancer Risk Scale</span></p>
                    <div class="funkyradio">
                      <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="catchmentView" type="checkbox"  checked="checked" class="form-check-input"> 
                        <label for="catchmentView" class="form-check-label">Catchment</label>
                        <div class="form-check form-check-inline funkyradio-primary">
                        <input name="chart_components" id="siteView" type="checkbox"  checked="checked" class="form-check-input"> 
                        <label for="siteView" class="form-check-label">Site</label>
                      </div>  
                      </div>
                      <p class="divider-text"><span class="bg-light">Data Parameters</span></p>
                      <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="variableSpecific" type="checkbox"  class="form-check-input" checked> 
                        <label for="variableSpecific" class="form-check-label">Varaible Specific</label>
                      </div> 
                        <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="maxLabel" type="checkbox"  checked="checked" class="form-check-input"> 
                        <label for="maxLabel" class="form-check-label">Max</label>
                      </div> 
                        <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="medianLabel" type="checkbox"  class="form-check-input" checked> 
                        <label for="medianLabel" class="form-check-label">Median</label>
                      </div> 
                        <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="recentLabel" type="checkbox"  class="form-check-input" checked> 
                        <label for="recentLabel" class="form-check-label">Most Recent</label>
                      </div>
                  </div>
                  </div>
                  </div>
             <div class="row" style="margin-bottom: 0.1rem;">
                  <div class="col-md-12">
                    <p class="divider-text"><span class="bg-light">Output Selection</span></p>
                    <div class="col-md-12">
                    <div class="form-group" style="margin-right: 0.2rem;">
                      <div class="slidecontainer" style="margin-left: 4px; margin-right: 10px; margin-top: 5px;">
                        <input type="range" min="1" max="100" value="10" class="slider" id="customRange3">  
                    </div>
                      <div class="form-control input rounded-0 minSamples inwards_label" style="margin-left: 4px; margin-right: 10px; margin-top: 5px;" placeholder="Set minimum number of samples using slider above">Refine sites by sample size</div>
                    </div>
                  </div>    
                    <div class="funkyradio">
                      <div class="form-check form-check-inline funkyradio-primary" >
                        <input name="chart_components" id="siteOverview" type="checkbox"  checked="checked" class="form-check-input"> 
                        <label for="siteOverview" class="form-check-label">Timeseries</label>
                      </div>
                      <div class="form-check form-check-inline funkyradio-primary">
                        <input name="chart_components" id="veryHigh" type="checkbox" class="form-check-input form-check-input"> 
                        <label for="veryHigh" class="form-check-label">Boxplots</label>
                      </div>
                      <div class="form-check form-check-inline funkyradio-primary">
                        <input name="chart_components" id="high" type="checkbox" class="form-check-input form-check-input"> 
                        <label for="high" class="form-check-label">Duration Curve</label>
                      </div>
                      <div class="form-check form-check-inline funkyradio-primary">
                        <input name="chart_components" id="critical" type="checkbox" class="form-check-input form-check-input"> 
                        <label for="critical" class="form-check-label">Table</label>
                      </div>                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <CatchmentTree ref="catchmentTree"/>
          <div class="card rounded-0">
            <div class="card-body">
              <div class="row no-gutters">
                <button class="btn inwards_button" type="button" style="width: 100%" @click="doAnalysis ()">
                  <i class="fa fa-line-chart"></i>Analyse
                </button>
                </div>
              </div>
              </div>
          <div class="card rounded-0">
            <div class="card-body">
              <div class="row no-gutters">
                  <RouterLink class="btn inwards_button" type="button" style="width: 100%" to="limits-dashboard">
                    <i class="fa fa-info"></i>
                    <span>View All Limtis and Naratives</span>
                  </RouterLink>
                </div>
              </div>
          </div>
          <MapDashboard ref="mapDashboard"/>
        </div>
        <div class="col-md-8 no-float right-panel" style="background: #1E1E1E; padding-bottom: 50px; padding-left: 10px; padding-right: 10px;">

          <div class="row no-gutters">
            <nav>
                  <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                      <a class="nav-item nav-link active" id="nav-riskTab-tab" data-toggle="tab" href="#riskTab" role="tab" aria-controls="nav-riskTab" aria-selected="true" style="text-align: center;">Risk Assesment</a>
                      <a class="nav-item nav-link" id="nav-nara-tab" data-toggle="tab" href="#naraTab" role="tab" aria-controls="nav-wqTab" aria-selected="false">Water Quality Naratives</a>

                      <a class="nav-item nav-link" id="nav-wqTab-tab" data-toggle="tab" href="#wqTab" role="tab" aria-controls="nav-wqTab" aria-selected="false">Water Quality Analysis</a>
                      <a class="nav-item nav-link" id="nav-complianceTab-tab"  data-toggle="tab" href="#complianceTab" role="tab" aria-controls="nav-complianceTab" aria-selected="false">Compliance</a>
                    </div>
                    </nav>
            <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent-login" style="width: 100%; height: 100hr;">
            <div class="tab-pane fade show active" id="riskTab" role="tabpanel" aria-labelledby="riskTab-tab">
            <div class="row no-gutters">
            <div class="col-md-12">
              <div class="card rounded-0 box">
                <div class="card-header inwards_card_tab" style="border-bottom: 1px solid white;">Selected Site Risk Assesment</div>
              <div class="card-body chart-container">
              <div class="row no-gutters">
              <div class="col-3">
                <nav>
                  <div class="nav flex-column nav-pills nav-fill" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      <a class="nav-item nav-link nav-vertical active" id="v-pills-singleMax-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-singleMax" role="tab" aria-controls="v-pills-singleMax" aria-selected="true">Max</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-singleMedian-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-singleMedian" role="tab" aria-controls="v-pills-singleMedian" aria-selected="false">Median</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-singleMin-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-singleMin" role="tab" aria-controls="v-pills-singleMin" aria-selected="false">Min</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-singleLatest-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-singleLatest" role="tab" aria-controls="v-pills-singleLatest" aria-selected="false">Latest</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-narative-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-narative" role="tab" aria-controls="v-pills-narative" aria-selected="false">Narative</a>

                    </div>
                  </nav>
                  </div>
              <div class="col-9">
                  <div class="tab-content" id="v-pills-tabContent">
                      <div class="tab-pane fade show active" id="v-pills-singleMax" role="tabpanel" aria-labelledby="v-pills-singleMax-tab">
                        <SiteRisk ref="siteComponent" style="margin-top: 5px;"/>
            </div>                
                    <div class="tab-pane fade" id="v-pills-singleMedian" role="tabpanel" aria-labelledby="v-pills-singleMedian-tab">

                    </div>
                    <div class="tab-pane fade" id="v-pills-singleMin" role="tabpanel" aria-labelledby="v-pills-singleMin-tab">...</div>
                    <div class="tab-pane fade" id="v-pills-singleLatest" role="tabpanel" aria-labelledby="v-pills-singleLatest-tab">...</div>
                    <div class="tab-pane fade" id="v-pills-narative" role="tabpanel" aria-labelledby="v-pills-narative-tab">
                      <NarativeBlock ref="narativeComponent" style="margin-top: 5px;"/>
                    </div>

            </div> 
            </div>
            </div>
            </div>
            </div>                       
            </div>       

            <div class="col-md-12">
              <div class="card rounded-0 box" >
                <div class="card-header inwards_card_tab" style="border-bottom: 1px solid white;">All Sites Risk Assesment (Inkomati WMA)</div>
              <div class="card-body chart-container">
              <div class="row no-gutters">
              
              <div class="col-md-3">
                <nav>
                  <div class="nav flex-column nav-pills nav-fill" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      <a class="nav-item nav-link nav-vertical active" id="v-pills-allMax-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-allMax" role="tab" aria-controls="v-pills-allMax" aria-selected="true">Max</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-allMedian-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-allMedian" role="tab" aria-controls="v-pills-allMedian" aria-selected="false">Median</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-allMin-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-allMin" role="tab" aria-controls="v-pills-allMin" aria-selected="false">Min</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-allLatest-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-allLatest" role="tab" aria-controls="v-pills-allLatest" aria-selected="false">Latest</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-maxsite-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-maxsite" role="tab" aria-controls="v-pills-maxsite" aria-selected="false">Max Site Value</a>

                    </div>
                  </nav>
                  </div>

              <div class="col-md-9" style="width: 100%">
                  <div class="tab-content" id="v-pills-tabContent">
                      <div class="tab-pane fade show active" id="v-pills-allMax" role="tabpanel" aria-labelledby="v-pills-allMax-tab">
                        <AllSites ref="allComponent" style="margin-top: 5px;"/>
                        <button class="btn btn-secondary btn-lg active" @click="showRiskHazard()"> <i class="fa fa-info"></i></button>
                                          </div>
                    <div class="tab-pane fade" id="v-pills-allMedian" role="tabpanel" aria-labelledby="v-pills-allMedian-tab">
                      <MedianRisk ref="medianComponent" style="margin-top: 5px;"/>
                    </div>
                    <div class="tab-pane fade" id="v-pills-allMin" role="tabpanel" aria-labelledby="v-pills-allMin-tab">
                      <MinRisk ref="minComponent" style="margin-top: 5px;"/>
                    </div>
                    <div class="tab-pane fade" id="v-pills-allLatest" role="tabpanel" aria-labelledby="v-pills-allLatest-tab">
                      <LatestRisk ref="latestComponent" style="margin-top: 5px;"/>
                    </div>
                    <div class="tab-pane fade" id="v-pills-maxsite" role="tabpanel" aria-labelledby="v-pills-maxsite-tab">
                      <HeighestRisk ref="heighestComponent" style="margin-top: 5px;"/>
                    </div>
                    <div class="tab-pane fade" id="v-pills-allrisk" role="tabpanel" aria-labelledby="v-pills-allrisk-tab">
                      <MaxHazard ref="maxComponent" style="margin-top: 5px;"/>
                    </div>
            </div> 
            </div>
            </div>
            </div>
            </div>                       
            </div>
            </div>
          </div>
          <div class="tab-pane fade show active" id="naraTab" role="tabpanel" aria-labelledby="nav-nara-tab">
            <div class="row no-gutters">
            <div class="col-md-12"> 
              
              
              
              <HealthNaratives ref="healthnarativesComponent" style="margin-top: 5px;"/>
            </div>       
            </div>
          </div>
            <div class="tab-pane fade" id="wqTab" role="tabpanel" aria-labelledby="wqTab">
            <div class="row no-gutters">
              <div class="col-md-6">
                  <TimeseriesChart ref="timeseriesComponent" style="margin-top: 5px;"/>
              </div>
              <div class="col-md-6" style="padding-left: 2px;">
                    <BoxChart ref="boxComponent" style="margin-top: 5px;"/>
                </div>
              <div class="col-md-6"> 
                    <LoadChart ref="loadComponent" style="margin-top: 5px;"/>
                </div>
                <div class="col-md-6" style="padding-left: 2px;">
                    <DurationChart ref="durationComponent" style="margin-top: 5px;"/>
                </div>
                </div>
            </div>
            <div class="tab-pane fade" id="complianceTab" role="tabpanel" aria-labelledby="complianceTab">

              <div class="col-md-12">
              <div class="card rounded-0 box">
                <div class="card-header inwards_card_tab" style="border-bottom: 1px solid white;">All Sites Risk Assesment</div>
              
              <div class="card-body">
              <div class="row no-gutters">
                <div class="col-2">
                <nav>
                  <div class="nav flex-column nav-pills nav-fill" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      <a class="nav-item nav-link nav-vertical active" id="v-pills-ecoli-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-ecoli" role="tab" aria-controls="v-pills-ecoli" aria-selected="true">E.COLI_Susp_Water</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-phos-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-phos" role="tab" aria-controls="v-pills-phos" aria-selected="false">PO4_P_Diss_Water</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-eCon-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-eCon" role="tab" aria-controls="v-pills-eCon" aria-selected="false">EC_Phys_Water</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-arse-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-arse" role="tab" aria-controls="v-pills-arse" aria-selected="false">As_Diss_Water</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-TIN-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-TIN" role="tab" aria-controls="v-pills-TIN" aria-selected="false">TIN (TBC)</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-turb-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-turb" role="tab" aria-controls="v-pills-turb" aria-selected="false">Turbidity(TBC)</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-temp-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-temp" role="tab" aria-controls="v-pills-temp" aria-selected="false">Temp(TBC)</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-phLower-tab" data-toggle="pill" style="border-bottom: 1px solid grey;"  href="#v-pills-phLower" role="tab" aria-controls="v-pills-phLower" aria-selected="false">ph_lower(TBC)</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-phUpper-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-phUpper" role="tab" aria-controls="v-pills-phUpper" aria-selected="false">ph_upper(TBC)</a>
                      <a class="nav-item nav-link nav-vertical" id="v-pills-cad-tab" data-toggle="pill" style="border-bottom: 1px solid grey;" href="#v-pills-cad" role="tab" aria-controls="v-pills-cad" aria-selected="true">CN_Diss_Water(TBC)</a>
                    </div>
                  </nav>
                  </div>

              <div class="col-10">
                  <div class="tab-content" id="v-pills-tabContent">
                      <div class="tab-pane fade show active" id="v-pills-ecoli" role="tabpanel" aria-labelledby="v-pills-ecoli-tab">
                        <EcoliCompliance ref="ecoliComponent" style="margin-top: 5px;"/>
                    </div>
                    <div class="tab-pane fade" id="v-pills-phos" role="tabpanel" aria-labelledby="v-pills-phos-tab">
                      <PhosCompliance ref="phosComponent" style="margin-top: 5px;"/>
                    </div>
                    <div class="tab-pane fade" id="v-pills-eCon" role="tabpanel" aria-labelledby="v-pills-eCon-tab">
                      <EcCompliance ref="ecComponent" style="margin-top: 5px;"/>
                    </div>

                    <div class="tab-pane fade" id="v-pills-arse" role="tabpanel" aria-labelledby="v-pills-arse-tab">
                      <ArseCompliance ref="arrqoComponent" style="margin-top: 5px;"/>
                    </div>
                    <div class="tab-pane fade" id="v-pills-TIN" role="tabpanel" aria-labelledby="v-pills-TIN-tab">
                    
                    </div>
                    <div class="tab-pane fade" id="v-pills-turb" role="tabpanel" aria-labelledby="v-pills-turb-tab">...</div>
                    
                    <div class="tab-pane fade" id="v-pills-temp" role="tabpanel" aria-labelledby="v-pills-temp-tab">
                    </div>
                    <div class="tab-pane fade" id="v-pills-phLower" role="tabpanel" aria-labelledby="v-pills-phLower-tab">
                    </div>
                    <div class="tab-pane fade" id="v-pills-phUpper" role="tabpanel" aria-labelledby="v-pills-phUpper-tab">
                    </div>
                    <div class="tab-pane fade" id="v-pills-cad" role="tabpanel" aria-labelledby="v-pills-cad-tab">
                      <CnCompliance ref="cnComponent" style="margin-top: 5px;"/>

                    </div>
            </div> 
          </div>
                </div>
            </div>
            </div>
            </div>
            </div>                       
            </div>
            </div>

              <br>
              <RiskHazard ref="riskhazardComponent" style="margin-top: 5px;"/>

           <grid-loader :loading="loading" :color="color" :size="size" class="loading_disks"></grid-loader>    
               
      <NavButtons/> 
    </div>
    </div>
  </div>
  </div>
</template>
<style>
.chartDivId.c3-line-[Reserve] {
  stroke-width: 5px;
}
.right-panel {
    overflow-y: scroll;
}
.left-panel {
    overflow-y: scroll;
}
.c3-line-Reserve {
    stroke-width: 2px;
}
.c3-line-Observed {
    stroke-width: 2px;
}
.c3-line-Last_Year {
    stroke-width: 2px;
    stroke-dasharray: 5.5;
}
.c3-circle-Events {
    stroke-width: 15px;
    stroke: rgb(0, 0, 0);
}
</style>
<script>
  import axios from 'axios';
  import NavButtons from '../../components/NavButtons'; 
  import MapDashboard from './MapDashboard';
  import MaxHazard from './MaxHazard';
  import CatchmentTree from './CatchmentTree';
  import BoxChart from './BoxChart';
  import TimeseriesChart from './TimeseriesChart';
  import DurationChart from './DurationChart';
  import LoadChart from './LoadChart';
  import SiteRisk from './SiteRisk';
  import RiskHazard from './RiskHazard';
  import EcoliCompliance from './EcoliCompliance';
  import EcCompliance from './EcCompliance';
  import PhosCompliance from './PhosCompliance';
  import ArseCompliance from './ArseCompliance';
  import CnCompliance from './CnCompliance';
  import LatestRisk from './LatestRisk';
  import MedianRisk from './MedianRisk';
  import HealthNaratives from './HealthNaratives';
  import HeighestRisk from './HeighestRisk';
  import AllSites from './AllSites';
  import MinRisk from './MinRisk';
  import StatusBar from '../StatusBar';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import GeoJSON from 'ol/format/GeoJSON';
  import NarativeBlock from './NarativeBlock';
  import {Fill, Stroke, Style} from 'ol/style';
  import { GridLoader } from 'vue-spinner/dist/vue-spinner.min.js';
  import $ from 'jquery';
  import path from 'path';
  import stateStore from '../../store/state_handler';
  require('promise.prototype.finally').shim();
  const { dialog, app } = require('electron').remote;

  export default {

    components: {
      MapDashboard,
      NavButtons,
      GridLoader,
      CatchmentTree,
      BoxChart,
      TimeseriesChart,
      DurationChart,
      LoadChart,
      MaxHazard,
      SiteRisk,
      HeighestRisk,
      AllSites,
      MedianRisk,
      MinRisk,
      LatestRisk,
      StatusBar,
      EcoliCompliance,
      PhosCompliance,
      EcCompliance,
      CnCompliance,
      ArseCompliance,
      RiskHazard,
      HealthNaratives,
      NarativeBlock
    },
    data () {
      return {
        stationsApi: 'https://inwards.award.org.za/app_json/iucma_wq_stations.php',
        boxplotApi: 'https://inwards.award.org.za/app_json/wq_boxplot.php',
        stationsCoordinates: {}, // To stored all stations with their coordinates
        stationsFeatures: {}, // To stored station features
        stationsRequest: null,
        selectedStations: [],
        selectedWMAs: [],
        mergeAPI: 'false',
        selectedType: '',
        types: [],
        selectedVariable: '',
        variableUnit: '',
        variables: [],
        variableSample: 'All', 
        stationsList: 'all',
        color: '#177a98',
        height: '35px',
        width: '4px',
        margin: '2px',
        size: '40px',
        loading: false,
        radius: '2px'
      };
    },
    beforeMount () {
      this.loadVariables();
      this.loadTypes();
    },
    mounted () {
      let self = this;
      self.mapDashboardRef = self.$refs.mapDashboard;
      self.catchmentTreeRef = self.$refs.catchmentTree;
      stateStore.getState(
        stateStore.keys.selectedWMAs,
        function (selectedWMAs) {
          if (!selectedWMAs) {
            return false;
          }
          if (selectedWMAs.length === 0) {
            return false;
          }
          self.selectedWMAs = selectedWMAs;
          self.mapDashboardRef.showSelectedWMA(selectedWMAs);
        }
      );
      self.$bus.$on('stationSelectedFromMap', (station, isStationSelected) => {
        self.catchmentTreeRef.toggleNode(station, isStationSelected);
      });
      self.$bus.$on('refreshStations', () => {
        self.fetchStations();
      });
      self.$bus.$on('addStationsToStore', (stations, chartStoredId) => {
        self.addStationsToStore(stations, chartStoredId);
      });
      let map = this.$refs.mapDashboard.map;
      self.addKnpLayer(map);
      $('#customRange3').on('input', function(){
              let v = $('#customRange3').val();
              //console.log(v);
              $('div.minSamples').text(v);
       });
    },
    methods: {
      doAnalysis () {
        console.log(this.selectedVariable);
        this.variableSample = this.selectedVariable;
        console.log(this.selectedStations[0]);
        console.log(this.selectedType);
        console.log(this.variables);
        if (this.selectedStations.length === 0) {
          dialog.showMessageBox(null, {
            type: 'warning',
            message: 'Please select at least one station',
            buttons: ['OK']
          });
          return;
        }
        let dateStartString = $('#dateStart').val();
        let dateEndString = $('#dateEnd').val();
        if (!dateStartString || !dateEndString) {
          dialog.showMessageBox(null, {
            type: 'warning',
            message: 'Missing start date / end date',
            buttons: ['OK']
          });
          return;
        }
        let dateStart = new Date(dateStartString);
        let dateEnd = new Date(dateEndString);
        if (dateStart > dateEnd) {
          dialog.showMessageBox(null, {
            type: 'warning',
            message: 'End date should be after start date',
            buttons: ['OK']
          });
          return;
        }
        let mergeDWS = document.getElementById('merge').checked;

        if(mergeDWS === true){
            this.mergeAPI = 'true';
        }

        this.loading = true;
        this.$refs.boxComponent.displayChart(this.selectedStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1]);
        this.$refs.timeseriesComponent.displayChart(this.selectedStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1], this.mergeAPI);
        this.$refs.durationComponent.displayChart(this.selectedStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1]);
        this.$refs.loadComponent.displayChart(this.selectedStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1]);
        this.$refs.maxComponent.updateTable(this.selectedStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1]);
        this.$refs.siteComponent.showRiskTable('stations='+ this.selectedStations +'&variable='+ this.selectedVariable[0]  +'&sd='+  this.formatDate(dateStart)  +'&ed='+  this.formatDate(dateEnd)  +'&unit='+  this.selectedVariable[1] +'&type='+  this.selectedType  +'&merge='+  this.mergeAPI);
        this.$refs.heighestComponent.showRiskTable('stations='+ this.selectedStations +'&variable='+ this.selectedVariable[0]  +'&sd='+  this.formatDate(dateStart)  +'&ed='+  this.formatDate(dateEnd)  +'&unit='+  this.selectedVariable[1] +'&type='+  this.selectedType  +'&merge='+  this.mergeAPI);
        this.$refs.allComponent.showRiskTable('stations='+ this.selectedStations +'&variable='+ this.selectedVariable[0]  +'&sd='+  this.formatDate(dateStart)  +'&ed='+  this.formatDate(dateEnd)  +'&unit='+  this.selectedVariable[1] +'&type='+  this.selectedType +'&merge='+  this.mergeAPI);
        this.$refs.medianComponent.showRiskTable('stations='+ this.selectedStations +'&variable='+ this.selectedVariable[0]  +'&sd='+  this.formatDate(dateStart)  +'&ed='+  this.formatDate(dateEnd)  +'&unit='+  this.selectedVariable[1] +'&type='+  this.selectedType +'&merge='+  this.mergeAPI);
        this.$refs.minComponent.showRiskTable('stations='+ this.selectedStations +'&variable='+ this.selectedVariable[0]  +'&sd='+  this.formatDate(dateStart)  +'&ed='+  this.formatDate(dateEnd)  +'&unit='+  this.selectedVariable[1] +'&type='+  this.selectedType +'&merge='+  this.mergeAPI);
        this.$refs.latestComponent.showRiskTable('stations='+ this.selectedStations +'&variable='+ this.selectedVariable[0]  +'&sd='+  this.formatDate(dateStart)  +'&ed='+  this.formatDate(dateEnd)  +'&unit='+  this.selectedVariable[1] +'&type='+  this.selectedType +'&merge='+  this.mergeAPI);
        this.$refs.ecoliComponent.showRiskTable();
        this.$refs.phosComponent.showRiskTable();
        this.$refs.ecComponent.showRiskTable();
        this.$refs.cnComponent.showRiskTable();
        this.$refs.arrqoComponent.showRiskTable();
        this.$refs.healthnarativesComponent.showNarativesTable('variable='+ this.selectedVariable[0]);

        this.loading = false;
      },
      detectType () {
        this.catchmentTreeRef.refreshStations();
        console.log(this.selectedType);
        this.fetchStations();
      },
      loadTypes () {
        axios.get('http://inwards.award.org.za/app_json/iucma_gauge_types.php').then(response => {
          this.types = response.data;
        }).catch(e => {
        });
      },
      loadVariables () {
        axios.get('http://inwards.award.org.za/app_json/variables.php').then(response => {
          this.variables = response.data;
        }).catch(e => {
        });
      },
      changeVariable() {
        
        console.log(this.selectedVariable);
        this.variableSample = this.selectedVariable[0];
        this.catchmentTreeRef.refreshStations();
        //this.fetchStations();
      },
      loadRiskTable (urk_paramters) {
        this.$refs.siteComponent.showRiskTable(urk_paramters);
      },
      showNarativesTable (urk_paramters) {
        this.$refs.healthnarativesComponent.showNarativesTable(urk_paramters);
      },
      showRiskHazard () {
        this.$refs.narativeComponent.showNarativeTable();
      },
      fetchStations () {
        let self = this; 
        let wmaNames = Object.assign([], self.selectedWMAs);
        // Cancel previous request if any
        if (this.stationsRequest) {
          this.stationsRequest.cancel('Canceling stations request');
          this.stationsRequest = null;
        }
        // Wrap wma name with single quotes, for api purposes
        wmaNames = wmaNames.sort();
        for (let i = 0; i < wmaNames.length; i++) {
          wmaNames[i] = `'${wmaNames[i]}'`;
        }
        let url = `${self.stationsApi}?wma=${wmaNames.join()}&type=${this.selectedType}&list=${this.stationsList}&variable=${this.variableSample}`;
        console.log(url);
        //console.log(stationFile);
        // Check if online
        let cancelToken = null;
         if (self.stationsRequest) {
            cancelToken = self.stationsRequest.token;
          }
          axios.get(url, { cancelToken: cancelToken }).then(response => {
            self.mapDashboardRef.loadStationsToMap(response.data);
            self.createCatchmentTree(response.data);
          }).catch(error => {
            console.log(error);
          });
        self.$bus.$on('stationSelectedFromMap', (station, isStationSelected) => {
          self.catchmentTreeRef.toggleNode(station, isStationSelected);
        });
        self.$bus.$on('refreshStations', () => {
          self.fetchStations();
        });
        self.$bus.$on('addStationsToStore', (stations, chartStoredId) => {
          self.addStationsToStore(stations, chartStoredId);
        });
        stateStore.getState(
          stateStore.keys.dateEnd,
          function (dateEnd) {
            if (!dateEnd) {
              var endDate = new Date();
              var dd = endDate.getDate();
              var mm = endDate.getMonth() + 1;
              var yyyy = endDate.getFullYear();
              if (dd < 10) {
                dd = '0' + dd;
              }
              if (mm < 10) {
                mm = '0' + mm;
              }
              dateEnd = yyyy + '-' + mm + '-' + dd;
            }
            document.getElementById('dateEnd').setAttribute('value', dateEnd);
          }
        );
        document.getElementById('dateEnd').onchange = function () {
          stateStore.setState(
            stateStore.keys.dateEnd,
            this.value
          );
        };
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 18250);
        var dd = startDate.getDate();
        var mm = startDate.getMonth() + 1;
        var yyyy = startDate.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        startDate = yyyy + '-' + mm + '-' + dd;
        document.getElementById('dateStart').setAttribute('value', startDate);
      },
      addStationsToStore (stations, chartStoredId) {
        let self = this;
        stateStore.getState(
          stateStore.keys.selectedStations,
          function (selectedStations) {
            if (!selectedStations || typeof selectedStations === 'undefined') {
              selectedStations = {};
            }
            for (let i = 0; i < stations.length; i++) {
              if (!selectedStations[stations[i]]) {
                selectedStations[stations[i]] = {
                  'feature': self.stationsFeatures[stations[i]],
                  'stationCoord': self.stationsCoordinates[stations[i]],
                  'chartStored': [chartStoredId]
                };
              } else {
                if (selectedStations[stations[i]]['chartStored'].indexOf(chartStoredId) < 0) {
                  selectedStations[stations[i]]['chartStored'].push(chartStoredId);
                }
              }
            }
            stateStore.setState(
              stateStore.keys.selectedStations,
              selectedStations
            );
          }
        );
      },
      addKnpLayer (map) {
        const knpJson = require('../../assets/knp.json');
        let knpLayer = new VectorLayer({
          source: new VectorSource({
            features: (new GeoJSON({
              defaultDataProjection: 'EPSG:4326'
            })).readFeatures(knpJson, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            })
          }),
          updateWhileAnimating: true,
          updateWhileInteracting: false
        });
        // map.addLayer(knpLayer);
        let knpStyle = new Style({
          stroke: new Stroke({
            color: [51, 204, 51, 0.6],
            width: 1
          }),
          fill: new Fill({
            color: [51, 204, 51, 0.2]
          }),
          zIndex: 1
        });
        knpLayer.setStyle(knpStyle);
      },
      createCatchmentTree (stationsData) {
        let self = this;
        // Start adding stations data to catchment
        let catchmentsData = self.mapDashboardRef.getCatchmentsData();
        for (let i = 0; i < stationsData.features.length; i++) {
          // let primary = stationsData.features[i]['properties']['primary'];
          let secondary = stationsData.features[i]['properties']['secondary'];
          let station = stationsData.features[i]['properties']['station'];
          let place = stationsData.features[i]['properties']['desc'];
          let sampleSize = stationsData.features[i]['properties']['sample_size_iucma'];
          let latestReading = stationsData.features[i]['properties']['latest'];
          let hydro = stationsData.features[i]['properties']['hydro'];
          let rqo = stationsData.features[i]['properties']['ewr_site'];
          let iucma = stationsData.features[i]['properties']['iucma'];
          this.stationsFeatures[station] = stationsData.features[i];
          this.stationsCoordinates[station] = stationsData.features[i].geometry.coordinates;
          let flow = 'N';
          if (hydro > 0) {
            flow = 'Y';
          }
          if (catchmentsData.hasOwnProperty(secondary)) {
            let stationName = '';
            if (latestReading != null) {
              stationName = station + ': ' + ' (' + iucma + ') ' + ' (' + sampleSize + ') ' + ' (' + rqo + ') ' + place + ' ' + latestReading.toString().slice(0, 10);
            } else {
              stationName = 'Problem with Station';
            }
            catchmentsData[secondary].push(stationName);
            catchmentsData[secondary].sort();
          }
        }
        //console.log(catchmentsData);
        let treeData = self.generateTreeData(catchmentsData);
        this.catchmentTreeRef.createTree(treeData, this.onCatchmentTreeSelectedHandler, this.onTreeReady);
      },
      onTreeReady (event, data) {
        const self = this;
        stateStore.getState(
          stateStore.keys.selectedCatchments,
          function (selectedCatchments) {
            if (!selectedCatchments) {
              return false;
            }
            self.catchmentTreeRef.toggleMultipleNodes(selectedCatchments, true);
          }
        );
      },
      generateTreeData (dictionary) {
        let treeData = [];
        let self = this;
        $.each(dictionary, function (key, catchment) {
          let hasChildren = false;
          if (typeof catchment === 'object' || catchment instanceof Array) {
            hasChildren = true;
          }
          let c = {
            text: hasChildren ? key : catchment,
            id: hasChildren ? key : catchment,
            type: hasChildren ? 'layer' : 'station'
          };
          if (hasChildren) {
            c['children'] = self.generateTreeData(catchment);
          };
          treeData.push(c);
        });
        return treeData;
      },
      onCatchmentTreeSelectedHandler (event, data) {
        // On catchment tree clicked
        let i = [];
        let selected = '';
        let selectedCatchments = [];
        let _selectedStations = [];
        let selectedBits = [];
        let _unselectedStations = Object.assign([], this.selectedStations);
        //console.log(_unselectedStations);
        for (i = 0; i < data.selected.length; i++) {
          selected = data.instance.get_node(data.selected[i]).text;
          selectedBits = selected.split(':');
          let type = data.instance.get_node(data.selected[i]).type;
          if (type === 'layer') {
            selectedCatchments.push(selectedBits[0]);
          } else if (type === 'station') {
            _selectedStations.push(selectedBits[0]);
            if (_unselectedStations.indexOf(selectedBits[0]) !== -1) _unselectedStations.splice(_unselectedStations.indexOf(selectedBits[0]), 1);
          }
        }
        this.mapDashboardRef.toggleSelectedStationsByStationNames(
          _selectedStations,
          _unselectedStations
        );
        this.selectedStations = _selectedStations;
        stateStore.setState(stateStore.keys.selectedCatchments, this.selectedStations);
        this.mapDashboardRef.selectCatchments(selectedCatchments);
      }
    }
  };
</script>