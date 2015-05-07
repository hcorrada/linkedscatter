library(shiny)
library(linkedscatter)
library(ISLR)

data(Auto)

names <- colnames(Auto)
ui <- shinyUI(fluidPage(
  selectInput("yvar", "Choose Y", choices=names, selected="mpg"),
  selectInput("x1var", "Choose X (left)", choices=names, selected="weight"),
  selectInput("x2var", "Choose X (right)", choices=names, selected="acceleration"),
  selectInput("tooltipVar", "Choose tooltip variable", choices=names, selected="name"),
  linkedscatterOutput("linkedscatter")
))

server <- shinyServer(function(input, output) {
  output$linkedscatter <- renderLinkedscatter(
    linkedscatter(Auto, y=input$yvar, x1=input$x1var, x2=input$x2var, tooltip=input$tooltipVar)
  )
})

shinyApp(ui=ui, server=server)

