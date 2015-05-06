#' linkedscatter
#'
#' Linked scatter plot
#'
#' @import htmlwidgets
#'
#' @export
linkedscatter <- function(data, width = NULL, height = NULL) {

  # forward options using x
  x = list(
    data = data
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'linkedscatter',
    x,
    width = width,
    height = height,
    package = 'linkedscatter'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
linkedscatterOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'linkedscatter', width, height, package = 'linkedscatter')
}

#' Widget render function for use in Shiny
#'
#' @export
renderLinkedscatter <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, linkedscatterOutput, env, quoted = TRUE)
}
