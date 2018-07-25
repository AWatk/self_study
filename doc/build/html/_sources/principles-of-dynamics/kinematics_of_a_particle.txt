.. _kinematics_of_a_particle:

Kinematics Of A Particle
========================

Kinematics
	The study of the motion of particles and rigid bodies,
        disregarding  the forces associated with these motions.

Frame of Reference
	A Frame of reference must be specified to describe motion of a
        point. While inertial frames are preferred for dynamic
        analysis, in kinematics there are no preferred frames of
        reference. 

Relative To / With Respect To
	Means as viewed by an observer fixed in the referenced system
        and moving with it

Referred To (a certain system)
	Means that the vector is expressed in terms of the unit
        vectors of that system

2.1 Position, Velocity, and Acceleration of a Point
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The **Position** of a point **P** relative to the *XYZ* reference frame
is given by the vector |r| drawn from the origin **O** to **P**.

**Velocity** and **Acceleration** are then defined as:

.. math::
   \vec{v}=\frac{d\vec{r}}{dt}

.. math::
   \vec{a}=\frac{d\vec{v}}{dt}=\frac{d^2\vec{r}}{dt^2}

The general motion of a **rigid body** involves changes of
**orienctation** as well as changes in **location**

2.2 Angular Velocity
^^^^^^^^^^^^^^^^^^^^

An infinitesimal displacement of all points in a rigid body can be
considered as a translational displacement |dels| plus a rotational
displacement |delomega| about an axis through a base point fixed in
the body.

|delomega| is a vector whose magnitude is equal to the angle of
rotation and whose direction is along an axis determined by those
points not displaced by the infinitesimal rotation.

**Angular Velocity** is then:

.. math::
   \vec{\omega}=\lim_{\Delta
   t\to\infty}\frac{\Delta\vec{\theta}}{\Delta t}

Angular Velocity has no meaning for a point, only a body (three
points, rigidly connected, not colinear)

2.3 Rigid Body Motion about a Fixed Point
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

*Rotational motion relative to a given system does not rely on the
choice of the base point.* Therefore, assume the base point is at the
origin.

*TODO Image here*

In general, the rotation of **P** at any instant is taking place about
an axis passing through the fixed base point. This axis is the
**instantaneous center of rotation**

.. math::
   \dot{s}=\omega r\sin\theta

The velocity of **P** along its path is of magnitude :math:`\dot{s}`
and is directed along the tangent to the path.

.. math::
   \vec{v}=\dot{\vec{s}}=\vec{\omega}\times\vec{r}

Differentiating with respect to time gives

.. math::
   \frac{d\vec{v}}{dt}=\vec{a}=\vec{\omega}\times\dot{\vec{r}}+\dot{\vec{\omega}}\times\vec{r}

and since :math:`\dot{\vec{r}}=\vec{v}`

.. math::
   \vec{a}=\vec{\omega}\times(\vec{\omega}\times\vec{r})+\dot{\vec{\omega}}\times\vec{r}

The first term :math:`\vec{\omega}\times(\vec{\omega}\times\vec{r})`
is known as **centripetal acceleration** and the second term
:math:`\dot{\vec{\omega}}\times\vec{r}` is **tangential acceleration**


2.4 Time Derivation of a Unit Vector
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

*TODO Image Here*

.. math::
   \dot{\vec{e_1}} = \vec{\omega}\times\vec{e_1}

.. math::
   \dot{\vec{e_2}} = \vec{\omega}\times\vec{e_2}

.. math::
   \dot{\vec{e_3}} = \vec{\omega}\times\vec{e_3}

If |e1|, |e2|, |e3| are orthogonal, :math:`\vec{\omega}` can be
written

.. math:: 
   \vec{\omega}=\omega_1\vec{e_1} + \omega_2\vec{e_2} +
   \omega_3\vec{e_3}

and

.. math::
   \dot{\vec{e_1}}=\begin{vmatrix}
   \vec{e_1} & \vec{e_2}  & \vec{e_3} \\ 
   \omega_1 & \omega_2 & \omega_3 \\ 
   1 & 0 & 0
   \end{vmatrix}

.. math::
   \dot{\vec{e_2}}=\begin{vmatrix}
   \vec{e_1} & \vec{e_2}  & \vec{e_3} \\ 
   \omega_1 & \omega_2 & \omega_3 \\ 
   0 & 1 & 0
   \end{vmatrix}

.. math::
   \dot{\vec{e_3}}=\begin{vmatrix}
   \vec{e_1} & \vec{e_2}  & \vec{e_3} \\ 
   \omega_1 & \omega_2 & \omega_3 \\ 
   0 & 0 & 1
   \end{vmatrix}


Becoming more specific, if the basis vectors are equal to
:math:`\hat{i},\hat{j},\hat{k}`, respectively, then

.. math::
   \vec{\omega}=\omega_x\hat{i} + \omega_y\hat{j} + \omega_z\hat{k}

.. math::
   \dot{\hat{i}}=\vec{\omega}\times\hat{i}=\omega_z\hat{j}-\omega_y\hat{k}

.. math::
   \dot{\hat{j}}=\vec{\omega}\times\hat{j}=\omega_x\hat{k}-\omega_z\hat{i}

.. math::
   \dot{\hat{k}}=\vec{\omega}\times\hat{k}=\omega_y\hat{i}-\omega_x\hat{j}

It can be seen in each case the time derivative of a unit vector lies
in a plane perpendicular to the vector, in accordance with the
defintion of a cross product. *Note that in each case, the rate of
change of a unit vector is calculated with respect to a fixed
coordinate system but is expressed in terms of the unit vectors of the
moving system.*


2.5 Velocities and Acceleration of a Particle in Several Coordinate Systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Cartesian
---------

Position
	.. math::
           \vec{r}=x\hat{i}+y\hat{j}+z\hat{k}

Velocity
	.. math::
           \vec{v}=\dot{\vec{r}}=\dot{x}\hat{i}+\dot{y}\hat{j}+\dot{z}\hat{k}

Acceleration
	.. math::
           \vec{a}=\ddot{x}\hat{i}+\ddot{y}\hat{j}+\ddot{z}\hat{k}

Cylindrical
---------

Position
	.. math::
           \vec{r}=r\vec{e_r}+z\vec{e_z}

Velocity
	.. math::
           \vec{v}=\dot{r}\vec{e_r}+\dot{z}\vec{e_z}+r\dot{\vec{e_r}}+z\dot{\vec{e_z}}

Acceleration
	.. math::
           \vec{a}=(\ddot{r}-r\phi^2)\vec{e_r}+(r\ddot{\phi}+2\dot{r}\dot{\phi})\vec{e_{\phi}}+\ddot{z}\vec{e_z}

Spherical
---------

Position
	.. math::
           \vec{r}=r\vec{e_r}

Velocity
	.. math::
           \vec{v}=\dot{r}\vec{e_r}+r\dot{\vec{e_r}}

Acceleration
	.. math::
           \vec{a}=&(\ddot{r}-r\dot{\theta}^2-r\dot{\phi}^2\sin^2\theta)\vec{e_r}\\+&(r\ddot{\theta}+2\dot{r}\dot{\theta}-r\dot{\phi}^2\sin\theta\cos\theta)\vec{e_{\theta}}\\+&(r\ddot{\phi}\sin\theta+2\dot{r}\dot{\theta}\sin\theta+2r\dot{\theta}\dot{\phi}\cos\theta)\vec{e_{\phi}}


Tangential and Normal Components
--------------------------------

The velocity and acceleration of a point **P** as it moves on a curved
path in space may be expressed in terms of **tangential** and
**normal** components.

.. math::
   d\vec{r}=ds\vec{e_t}

where :math:`\vec{e_t}` is a unit vector that is tangent to the path
of **P** and points in the direction of increasing **s**

Velocity
	.. math::
           \vec{v}=\dot{s}\frac{d\vec{r}}{ds}=\dot{s}\vec{e_t}

Acceleration
	.. math::
           \vec{a}=\ddot{s}\vec{e_t}+\frac{\dot{s}^2}{\rho}\vec{e_n}


.. |r| replace:: :math:`\vec{r}`

.. |dels| replace:: :math:`\Delta\vec{s}`

.. |delomega| replace:: :math:`\Delta\vec{\omega}`

.. |e1| replace:: :math:`\vec{e_1}`

.. |e2| replace:: :math:`\vec{e_2}`

.. |e3| replace:: :math:`\vec{e_3}`
                          
