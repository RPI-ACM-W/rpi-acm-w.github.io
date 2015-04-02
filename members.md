---
layout: page
title: Members
permalink: /members/
---

{% for org_hash in site.data.orgs | sort: 'name' %}
{% assign org = org_hash[1] %}
<p><h2>{{ org.name }}</h2>
    <ul>
    {% for member in org.members %}
        <li>
        {% if member.site %}
           <a href="{{ member.site }}">{{ member.name }}</a>
        {% elsif member.title %}
           {{ member.name }}, {{ member.title }}
        {% else %}
           {{ member.name }}
        {% endif %}
        </li>
    {% endfor %}
    </ul>
</p>
{% endfor %}
