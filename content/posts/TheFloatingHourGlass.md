Title: The Floating Hourglass
Date: 2018-02-02 10:00
Category: Shownotes
Author: Zak Espley
Stylesheets: https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css,https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css 
Javascripts: https://code.jquery.com/jquery-3.3.1.min.js, https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js, https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js, https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js, https://cdnjs.cloudflare.com/ajax/libs/function-plot/1.18.1/function-plot.js, https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML, https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.7.0/pixi.js, https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.7.0/pixi.min.js.map, app.js
Summary:Hourglass Floating in Water

# Introduction
We started by looking at the following animation:

<div align="center">
<img src="https://i.makeagif.com/media/7-29-2016/Clh8gl.gif">
</div>
This is very counter intuitive. Though the distribution of mass changes within the hourglass, the total mass and volume is always the same.

In physics we are taught that for Newton's 2nd Law, \(\sum F_{ext}=ma\), we can treat distributed masses like a point, with all of the forces acting at the center of mass. So it seems that the force of gravity and the buoyant force should always be the same. This would imply that the hourglass either always sinks, or always floats since the sum of the external forces is not changing. The odd feeling that this isn't behaving as expected prompted the podcast.

# Derek's Hypothesis
Derek came up with a theory about how the hourglass could wedge itself against the walls of the container due to an unstable equilibrium. We know from the start of the GIF that the hourglass wants to float, and therefore it should always float unless another force is acting on it.

Unlike Newton's 2nd Law, when we consider the net torque on a body we can not treat it like a point mass. Thus **how** the mass is distributed will effect the torque. When the sand is in the upper half, the hourglass would like to flip. But since the walls of the cylinder are preventing it from flipping, it gets stuck. The walls add another force to the system, friction. This frictional force holds the hourglass down prevents it from floating.

As the sand drains to the bottom, the hourglass will right itself vertically, and release itself from the wall. Now the force of friction is gone and the hourglass is free to float again.

As it turn's out, this is the correct answer.

# Zak's Thoughts
For a sanity check, Zak created a couple models of the system to see what would happen. In the podcast we ran into problems with our first simple model. Afterwards, Zak realized the problems and the rest is explained below.

## Two cans, side-by-side
### Setup
<p align="center">
<img src="images/thefloatinghourglass/Hourglass-CansStacked-Forces (2).png" width=500px>
</p>


Zak started by considering two non-interacting cans submerged in water. The total mass of the system is \(M\) and is held constant. We can magically transfer mass between the cans, but we can't add or subtract from the total amount inside. The can on the right has mass \(m_T\) (T for top as we'll see later) and the can on the left mass \(m_B\) (B for bottom). \(M\) can be expressed as the sum of \(m_T\) and \(m_B\). That is:

\begin{align}
    M = m_T + m_B \label{eq:mathconv}
\end{align}
Since the basic unit of mass in this system is the mass volume of water displaced by a single can, \(m_w\), we should express all masses this way. Thus the total mass will become:

\begin{align}
    M=\kappa m_w \ni \kappa \in \mathbb{R^{+}} \label{eq:kmass}
\end{align}

Thus we have:

\begin{align}
    \kappa m_w = m_T + m_B \label{eq:kmassSum}
\end{align}

Since total mass is conserved we will parameterize how much of the total mass is in the top can using a filling factor \(\lambda\) such that \(0 \leq \lambda \leq 1\). When \(\lambda=1\), all of the mass will be in the right can, and none in the left. When \(\lambda=0\), the opposite is true. This means that all the masses are described by:

\begin{align}
    m_T &=\lambda M \label{eq:mt} \\
    m_B &= (1-\lambda) M \label{eq:mb}\\
    \kappa m_w &= \lambda\kappa m_w + (1-\lambda)\kappa m_w \label{eq:mass}
\end{align}

\eqref{eq:mass} can be accounted for by combining \eqref{eq:kmass}, \eqref{eq:kmassSum}, \eqref{eq:mt} and \eqref{eq:mb}.

### Intuition

##### When do objects float?

To start we look at any submerged object (not just the cans, but for any object). If gravity and the buoyant forces are the only two forces acting on the object, and it is neutrally buoyant (that is that it neither wants to sink nor float), then we know the following:

\begin{align}
    -mg+F&_{Buoy} = 0 \notag \\
    \Rightarrow F_{Buoy}&=mg \label{eq:Buoy1}
\end{align}

Then the buoyant force is defined as the following, where \(\rho_w\) is the density of water (since we are using water) and \(V\) is the volume of the object. More information and teh derivation of the equation can be seen at [Khan Academy's lesson on the buoyant force](https://www.khanacademy.org/science/physics/fluids/buoyant-force-and-archimedes-principle/a/buoyant-force-and-archimedes-principle-article).

\begin{align}
    F_{Buoy} = \rho_wVg = m_wg \label{eq:Buoy2}
\end{align}

The last equality comes from mass being the product of density and volume. Notice though that since it is the density of water and the volume of the object, we get the mass of the water displaced by the object. This is true of any object submerged in water.

Now we substitute \eqref{eq:Buoy2} into \eqref{eq:Buoy1} to get the condition for neutral buoyancy:

\begin{align}
    m = m_w \label{eq:buoycond1}
\end{align}

That is to say that the object will be neutrally buoyant when its mass is equal to the mass of the volume of water it has displaced. If \(m > m_w\) then that object will sink. If \(m < m_w \) the object will float. (Often times you see this same condition express in terms of densities.) This is summed up in the following:

\[
    \left.
    \begin{aligned}
        m = m_w &\Rightarrow \text{Neutrally Buoyant} \\
        m < m_w &\Rightarrow \text{Object Floats} \\
        m > m_w &\Rightarrow \text{Object Sinks}
    \end{aligned} \tag{10} \label{eq:buoycond}
    \right\}
\]
For us, this means that one of our cans will float when it has equal to \(m_w\). This happens for either individual can when it is full and \(\kappa=1\).

Let's look at \(m_w\) from another, more intuitive, light. \(m_w\) is the mass of water displaced by the the can. It can also be thought of as the mass of the can if it were full of water. This is how we will refer to \(m_w\) here on out.

##### What is \(\kappa\)?

\(\kappa\) is more specific to our model. It is a scaling that lets us represent the total mass of the system as some amount of cans full of water. i.e. if \(\kappa=\frac{1}{2}\) then the total mass is equal to half of the mass of one of the cans filled with water. If \(\kappa= \pi\) then the total mass is equal to \(\pi\) cans full of water. Using this and our floating conditions should help us get a good footing on what will happen to our system with certain bounds for \(\kappa\).

##### Floating and sinking in our model.
Now that we have some idea of what \(\kappa\) represents, let's now look at different distributions of mass (different \(\lambda\) values), for different total masses (different \(\kappa\) values). We can think about what happens as mass moves form the right can to the left, \(\lambda:1\rightarrow0\).

If \(\kappa < 1\), then \(M < m_w\) by \eqref{eq:kmass}. If we compare that to our floating conditions, \eqref{eq:buoycond} we see the system should float.  This means that no matter what \(\lambda\) is, our system can never sink. Even if all if the mass is in one can or the other, \(\lambda=1\) or  \(\lambda=0\), the full can will still be lighter than a can full of water. However we distribute the mass, both cans will float.

When \(\kappa=1\) the system will have the same mass as one of the cans full of water. Then while \(\lambda\) varies between 1 and 0 mass will start in the right can move to the left. When \(\lambda=1\) we will meet our neutral buoyancy condition, \eqref{eq:buoycond1}, for the right can. The left will then went float. Once we move any amount of mass from the right can to the left, \(0<\lambda<1\), both cans will want to float as each will now have a mass less than \(m_w\).

Now we consider \(1<\kappa<2\). When all the mass starts in the right can, we will have \(m_T > m_w\) and thus the can will want to sink. As \(\lambda\) decreases and mass is transferred from the right to the left, we will find a point where \(m_T=m_w\). At this point the right can will be neutrally buoyant and for all \(\lambda\) less than this point, right can will float.


<div id="display"></div>

<label for="lamVal">$$\lambda=$$</label>
<input type="text" id="lamVal" readonly style= "border:0; font-weight:bold; width:2em; margin-bottom:13px; margin-left:5px ">
<div class="col jqslider" id="lambda"></div>

<label for="kapVal">$$\kappa=$$</label>
<input type="text" id="kapVal" readonly style= "border:0; font-weight:bold; width:2em; margin-bottom:13px;">
<div class="col jqslider" id="kappa"></div>


<div class="centered"id="canchart" align="center"></div>
<div class="row">
    <div class="col">
        <p>$$a_T=\text{blue}$$</p>
        <p>$$a_B=\text{red}$$</p>
        <p>$$a_{total}=a_T+a_B=\text{green}$$</p>
        <p>$$\text{Current } \lambda=\text{yellow}$$ </p>
    </div>
</div>
</div>