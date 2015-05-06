#' linkedscatter
#'
#' Linked scatter plot
#'
#' @import htmlwidgets
#'
#' @export
linkedscatter <- function(data, x=NULL, y=NULL, tooltip=NULL, linked=FALSE, width = NULL, height = NULL) {

  # make sure data is not missing
  stopifnot(!missing(data) || !is.data.frame(data))

  names <- colnames(data)
  # if x is missing, use the first column in data
  if (missing('x')) {
    x <- names[1]
  }

  # if y is missing, use the second column in data
  if (missing('y')) {
    y <- names[2]
  }

  # if 'tooltip' is missing, use the third column in data
  if (missing('tooltip')) {
    tooltip <- names[3]
  }

  # check the names are in the dataframe
  stopifnot((x %in% names) && (y %in% names) && (tooltip %in% names))

  # forward options using x
  bindings = list(
    data = data,
    x = x,
    y = y,
    tooltip = tooltip
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'linkedscatter',
    bindings,
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
